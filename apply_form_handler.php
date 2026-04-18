<?php
// apply_form_handler.php

$to = "contact@aksisss.com";

function sanitize($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// List of expected fields
$fields = [
    'fullName', 'phone', 'email', 'address', 'dob', 'nationality',
    'position', 'workHistory', 'education', 'skills', 'availability',
    'references', 'motivation', 'scenario'
];
$data = [];
$errors = [];
$uploadedFiles = [];
$maxFileSize = 5 * 1024 * 1024; // 5MB
$allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Improved AJAX detection
$isAjax = (
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
    || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize all fields
    foreach ($fields as $field) {
        $data[$field] = isset($_POST[$field]) ? sanitize($_POST[$field]) : '';
    }

    // Validate required fields
    $required = [
        'fullName', 'phone', 'email', 'address', 'position',
        'workHistory', 'education', 'skills', 'availability',
        'references', 'motivation', 'scenario'
    ];
    foreach ($required as $field) {
        if (empty($data[$field])) $errors[] = ucfirst($field) . " is required.";
    }
    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format.";
    if (!empty($data['phone']) && !preg_match('/^[0-9\-\+\s]{8,20}$/', $data['phone'])) $errors[] = "Invalid phone number format.";

    // Handle resume file upload (required)
    $uploadDir = __DIR__ . "/uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] !== UPLOAD_ERR_NO_FILE) {
        $file = $_FILES['resume'];
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $errors[] = "Resume upload failed.";
        } elseif ($file['size'] > $maxFileSize) {
            $errors[] = "Resume exceeds maximum file size (5MB).";
        } else {
            $fileType = mime_content_type($file['tmp_name']);
            if (!in_array($fileType, $allowedTypes)) {
                $errors[] = "Resume type not allowed.";
            } else {
                $fileName = basename($file['name']);
                $fileName = preg_replace('/[^A-Za-z0-9_\.-]/', '_', $fileName); // sanitize filename
                $destPath = $uploadDir . uniqid('resume_') . '_' . $fileName;
                if (move_uploaded_file($file['tmp_name'], $destPath)) {
                    $uploadedFiles['resume'] = [
                        'path' => $destPath,
                        'name' => $fileName,
                        'type' => $fileType
                    ];
                } else {
                    $errors[] = "Failed to save Resume.";
                }
            }
        }
    } else {
        $errors[] = "Resume is required.";
    }

    if (empty($errors)) {
        $subject = "New Job Application from " . $data['fullName'];
        $body = "APPLICATION FORM.\nYou have received a new job application.\n\n";
        foreach ($fields as $field) {
            $label = ucwords(str_replace(['Name', 'Number'], [' Name', ' Number'], preg_replace('/([a-z])([A-Z])/', '$1 $2', $field)));
            $body .= "$label: " . $data[$field] . "\n";
        }
        foreach ($uploadedFiles as $fileField => $fileInfo) {
            $body .= ucfirst($fileField) . ": " . $fileInfo['name'] . "\n";
        }

        $from = $data['email'];
        $headers = "From: $from\r\nReply-To: $from\r\n";

        $mailSent = false;
        // Handle attachment (multipart email)
        if (isset($uploadedFiles['resume'])) {
            $boundary = md5(time());
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
            $message = "--$boundary\r\n";
            $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
            $message .= $body . "\r\n";
            $fileInfo = $uploadedFiles['resume'];
            $fileContent = chunk_split(base64_encode(file_get_contents($fileInfo['path'])));
            $message .= "--$boundary\r\n";
            $message .= "Content-Type: " . $fileInfo['type'] . "; name=\"" . $fileInfo['name'] . "\"\r\n";
            $message .= "Content-Disposition: attachment; filename=\"" . $fileInfo['name'] . "\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $message .= $fileContent . "\r\n";
            $message .= "--$boundary--";
            $mailSent = mail($to, $subject, $message, $headers);
        } else {
            $mailSent = mail($to, $subject, $body, $headers);
        }

        if ($isAjax) {
            header('Content-Type: application/json');
            if ($mailSent) {
                echo json_encode(["success" => true, "message" => "Thank you! Your application has been submitted."]);
            } else {
                echo json_encode(["success" => false, "errors" => ["Failed to send email. Please try again later."]]);
            }
        } else {
            if ($mailSent) {
                echo '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="2;url=index.html"><title>Thank You</title></head><body>';
                echo '<script>alert("Thank you! Your application has been submitted."); window.location.href = "index.html";</script>';
                echo '<noscript>Thank you! Your application has been submitted. Redirecting...<meta http-equiv="refresh" content="2;url=index.html"></noscript>';
                echo '</body></html>';
            } else {
                echo 'Failed to send email. Please try again later.';
            }
        }
    } else {
        if ($isAjax) {
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
    if ($isAjax) {
        header('Content-Type: application/json');
        echo json_encode(["success" => false, "errors" => ["Method Not Allowed"]]);
    } else {
        echo "Method Not Allowed";
    }
}
?> 