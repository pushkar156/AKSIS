<?php
// contact-handler.php

$to = "contact@aksisss.com";

function sanitize($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

$fields = [
    'companyName', 'contactName', 'address', 'contactNumber', 'email', 'state', 'country',
    'industry', 'applicationType', 'uploadChoice', 'enquiryDetails'
];
$data = [];
$errors = [];
$uploadedFileName = "";
$uploadedFilePath = "";
$uploadedFileType = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Extract and sanitize all fields
    foreach ($fields as $field) {
        $data[$field] = isset($_POST[$field]) ? sanitize($_POST[$field]) : '';
    }

    // Validate required fields
    if (empty($data['contactName'])) $errors[] = "Contact Name is required.";
    if (empty($data['email'])) $errors[] = "Email is required.";
    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format.";

    // File upload handling (enabled, with attachment)
    $attachment = false;
    if (isset($_FILES["uploadDocument"]) && $_FILES["uploadDocument"]["error"] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . "/uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $fileTmpPath = $_FILES["uploadDocument"]["tmp_name"];
        $fileName = basename($_FILES["uploadDocument"]["name"]);
        $fileName = preg_replace('/[^A-Za-z0-9_\.-]/', '_', $fileName); // sanitize filename
        $destPath = $uploadDir . $fileName;
        $fileType = mime_content_type($fileTmpPath);
        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $uploadedFileName = $fileName;
            $uploadedFilePath = $destPath;
            $uploadedFileType = $fileType;
            // Only attach if PDF or DOC/DOCX
            if (in_array($fileType, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])) {
                $attachment = true;
            }
        } else {
            $errors[] = "Failed to save uploaded file.";
        }
    }

    if (empty($errors)) {
        $subject = "New Contact Form Submission from " . $data['contactName'];
        $body = "CONTACT FORM.\nYou have received a new contact form submission.\n\n";
        foreach ($fields as $field) {
            $label = ucwords(str_replace(['Name', 'Number'], [' Name', ' Number'], preg_replace('/([a-z])([A-Z])/', '$1 $2', $field)));
            $body .= "$label: " . $data[$field] . "\n";
        }
        if ($uploadedFileName) {
            $body .= "Uploaded File: $uploadedFileName\n";
        }

        $from = $data['email'];
        $headers = "From: $from\r\nReply-To: $from\r\n";

        // Handle attachment if present
        if ($attachment && file_exists($uploadedFilePath)) {
            $fileContent = chunk_split(base64_encode(file_get_contents($uploadedFilePath)));
            $boundary = md5(time());
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
            $message = "--$boundary\r\n";
            $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
            $message .= $body . "\r\n";
            $message .= "--$boundary\r\n";
            $message .= "Content-Type: $uploadedFileType; name=\"$uploadedFileName\"\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$uploadedFileName\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $message .= $fileContent . "\r\n";
            $message .= "--$boundary--";
            mail($to, $subject, $message, $headers);
        } else {
            mail($to, $subject, $body, $headers);
        }

        // Success response: thank you message and redirect
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
            header('Content-Type: application/json');
            echo json_encode(["success" => true, "message" => "Thank you! Your form has been submitted."]);
        } else {
            echo '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="2;url=index.html"><title>Thank You</title></head><body>';
            echo '<script>alert("Thank you! Your form has been submitted."); window.location.href = "index.html";</script>';
            echo '<noscript>Thank you! Your form has been submitted. Redirecting...<meta http-equiv="refresh" content="2;url=index.html"></noscript>';
            echo '</body></html>';
        }
    } else {
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
            header('Content-Type: application/json');
            echo json_encode(["success" => false, "errors" => $errors]);
        } else {
            foreach ($errors as $error) {
                echo $error . "<br>";
            }
        }
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
?> 