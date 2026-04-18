// Search functionality for AKSIS website
class AKSSearch {
    constructor() {
        this.searchIndex = this.buildSearchIndex();
        this.init();
    }

    // Build search index of all website content
    buildSearchIndex() {
        return [
            {
                title: "Home",
                url: "index.html",
                category: "Main",
                keywords: ["home", "main", "aksis", "welcome", "pharmaceutical", "technology", "solutions"],
                description: "AKSIS - Leading pharmaceutical technology solutions provider. We offer machinery equipment, consultancy, raw materials, software technology, and more."
            },
            {
                title: "Machinery Equipment",
                url: "keys_machinery.html",
                category: "Keys",
                keywords: ["machinery", "equipment", "machines", "industrial", "manufacturing", "production", "automation"],
                description: "High-quality machinery and equipment for pharmaceutical manufacturing and processing industries."
            },
            {
                title: "Consultancy And Technology",
                url: "keys_consultancy.html",
                category: "Keys",
                keywords: ["consultancy", "consulting", "technology", "expertise", "advice", "solutions", "professional"],
                description: "Professional consultancy services and technology solutions for pharmaceutical and manufacturing industries."
            },
            {
                title: "Raw Material",
                url: "keys_raw-material.html",
                category: "Keys",
                keywords: ["raw material", "materials", "ingredients", "chemicals", "substances", "components"],
                description: "Quality raw materials and ingredients for pharmaceutical and manufacturing processes."
            },
            {
                title: "Software Technology",
                url: "keys_software.html",
                category: "Keys",
                keywords: ["software", "technology", "digital", "automation", "systems", "programming", "IT"],
                description: "Advanced software technology solutions for pharmaceutical and manufacturing automation."
            },
            {
                title: "Packaged Food",
                url: "keys_packaged-food.html",
                category: "Keys",
                keywords: ["packaged food", "food", "packaging", "nutrition", "consumables", "edible"],
                description: "Packaged food solutions and products for various industries and applications."
            },
            {
                title: "Spare Parts",
                url: "keys_spare-parts.html",
                category: "Keys",
                keywords: ["spare parts", "parts", "components", "replacement", "maintenance", "repair"],
                description: "High-quality spare parts and components for machinery and equipment maintenance."
            },
            {
                title: "Assembly",
                url: "keys_assembly.html",
                category: "Keys",
                keywords: ["assembly", "assembling", "construction", "building", "manufacturing", "production"],
                description: "Professional assembly services for machinery and equipment manufacturing."
            },
            {
                title: "Re-Refining",
                url: "keys_re-refining.html",
                category: "Keys",
                keywords: ["re-refining", "refining", "recycling", "sustainability", "environmental", "oil"],
                description: "Re-refining solutions for sustainable and environmental-friendly industrial processes."
            },
            {
                title: "Processing",
                url: "expertise_processing.html",
                category: "Expertise",
                keywords: ["processing", "manufacturing", "production", "industrial", "chemical", "pharmaceutical"],
                description: "Expert processing solutions for pharmaceutical and chemical manufacturing industries."
            },
            {
                title: "Manufacturing",
                url: "expertise_manufacturing.html",
                category: "Expertise",
                keywords: ["manufacturing", "production", "factory", "industrial", "assembly", "quality"],
                description: "Comprehensive manufacturing expertise and solutions for various industries."
            },
            {
                title: "Material Handling",
                url: "expertise_material-handling.html",
                category: "Expertise",
                keywords: ["material handling", "logistics", "transportation", "warehousing", "storage", "movement"],
                description: "Efficient material handling solutions for industrial and manufacturing operations."
            },
            {
                title: "Packaging",
                url: "expertise_packaging.html",
                category: "Expertise",
                keywords: ["packaging", "packaging solutions", "containers", "wrapping", "protection", "presentation"],
                description: "Innovative packaging solutions for pharmaceutical and consumer products."
            },
            {
                title: "Spare & Services",
                url: "expertise_spare-services.html",
                category: "Expertise",
                keywords: ["spare parts", "services", "maintenance", "repair", "support", "technical"],
                description: "Comprehensive spare parts and technical services for equipment maintenance."
            },
            {
                title: "Furniture",
                url: "expertise_furniture.html",
                category: "Expertise",
                keywords: ["furniture", "office", "industrial", "ergonomic", "workspace", "interior"],
                description: "Quality furniture solutions for office and industrial workspace requirements."
            },
            {
                title: "About AKSIS",
                url: "about_about.html",
                category: "About",
                keywords: ["about", "company", "aksis", "history", "mission", "vision", "values"],
                description: "Learn about AKSIS - our history, mission, vision, and commitment to pharmaceutical technology excellence."
            },
            {
                title: "Careers",
                url: "about_careers.html",
                category: "About",
                keywords: ["careers", "jobs", "employment", "opportunities", "work", "positions", "hiring"],
                description: "Career opportunities at AKSIS. Join our team of pharmaceutical technology professionals."
            },
            {
                title: "Resources",
                url: "resources.html",
                category: "Resources",
                keywords: ["resources", "information", "guides", "documents", "knowledge", "reference"],
                description: "Valuable resources and information for pharmaceutical and manufacturing professionals."
            },
            {
                title: "Case Studies",
                url: "case-studies.html",
                category: "Resources",
                keywords: ["case studies", "examples", "success stories", "projects", "implementations", "results"],
                description: "Real-world case studies showcasing successful implementations and project results."
            },
            {
                title: "Contact",
                url: "contact.html",
                category: "Contact",
                keywords: ["contact", "get in touch", "inquiry", "support", "help", "phone", "email", "address"],
                description: "Contact AKSIS for inquiries, support, and information about our pharmaceutical technology solutions."
            },
            {
                title: "Apply for Careers",
                url: "apply_form.html",
                category: "Careers",
                keywords: ["apply", "application", "job application", "career", "employment", "hire"],
                description: "Apply for career opportunities at AKSIS. Submit your application for available positions."
            }
        ];
    }

    // Initialize search functionality
    init() {
        // Handle search form submission on all pages
        this.setupSearchForms();
        
        // If we're on search results page, perform search
        if (window.location.pathname.includes('search-results.html')) {
            this.performSearch();
        }
    }

    // Setup search forms on all pages
    setupSearchForms() {
        const searchForms = document.querySelectorAll('.navbar-search');
        searchForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchInput = form.querySelector('input[name="q"]');
                const query = searchInput.value.trim();
                
                if (query) {
                    // Redirect to search results page
                    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
                }
            });
        });
    }

    // Perform search and display results
    performSearch() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        
        if (!query) {
            this.showNoResults();
            return;
        }

        // Update search query display
        document.getElementById('searchQuery').textContent = query;
        
        // Update search input value
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = query;
        }

        // Perform search
        const results = this.search(query);
        this.displayResults(results, query);
    }

    // Search through the index
    search(query) {
        const searchTerm = query.toLowerCase();
        const results = [];

        this.searchIndex.forEach(item => {
            let score = 0;
            
            // Check title
            if (item.title.toLowerCase().includes(searchTerm)) {
                score += 10;
            }
            
            // Check keywords
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(searchTerm)) {
                    score += 5;
                }
            });
            
            // Check description
            if (item.description.toLowerCase().includes(searchTerm)) {
                score += 3;
            }
            
            // Check category
            if (item.category.toLowerCase().includes(searchTerm)) {
                score += 2;
            }

            if (score > 0) {
                results.push({
                    ...item,
                    score: score,
                    snippet: this.generateSnippet(item.description, searchTerm)
                });
            }
        });

        // Sort by relevance score
        results.sort((a, b) => b.score - a.score);
        
        return results;
    }

    // Generate search snippet with highlighted terms
    generateSnippet(description, searchTerm) {
        const maxLength = 150;
        let snippet = description;
        
        // Find the position of the search term
        const termIndex = description.toLowerCase().indexOf(searchTerm.toLowerCase());
        
        if (termIndex !== -1) {
            // Start snippet around the search term
            const start = Math.max(0, termIndex - 50);
            const end = Math.min(description.length, termIndex + 100);
            snippet = description.substring(start, end);
            
            // Add ellipsis if needed
            if (start > 0) snippet = '...' + snippet;
            if (end < description.length) snippet = snippet + '...';
        } else {
            // If term not found, take first part of description
            snippet = description.substring(0, maxLength);
            if (description.length > maxLength) snippet += '...';
        }
        
        // Highlight search terms
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        snippet = snippet.replace(regex, '<span class="search-highlight">$1</span>');
        
        return snippet;
    }

    // Display search results
    displayResults(results, query) {
        const resultsContainer = document.getElementById('searchResults');
        const resultsCount = document.getElementById('resultsCount');
        const noResults = document.getElementById('noResults');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '';
            resultsCount.textContent = '0';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        resultsCount.textContent = results.length;
        
        const resultsHTML = results.map(result => `
            <div class="result-item">
                <a href="${result.url}" class="result-title">${result.title}</a>
                <div class="result-url">${result.url}</div>
                <div class="result-snippet">${result.snippet}</div>
                <span class="result-category">${result.category}</span>
            </div>
        `).join('');
        
        resultsContainer.innerHTML = resultsHTML;
    }

    // Show no results message
    showNoResults() {
        document.getElementById('searchQuery').textContent = '';
        document.getElementById('resultsCount').textContent = '0';
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('noResults').style.display = 'block';
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AKSSearch();
}); 