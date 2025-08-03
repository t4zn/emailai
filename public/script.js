// DOM elements
const emailForm = document.getElementById('emailForm');
const loadSampleBtn = document.getElementById('loadSample');
const generateBtn = document.getElementById('generateBtn');
const resultContainer = document.getElementById('resultContainer');
const emailSubject = document.getElementById('emailSubject');
const emailBody = document.getElementById('emailBody');
const copyBtn = document.getElementById('copyBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// Sample data from testInput.json
const sampleData = {
    name: "Alexandra Chen",
    role: "Senior Software Engineer",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Machine Learning", "System Design", "Agile Methodologies"],
    experience: "6+ years of experience leading development teams and architecting scalable solutions for Fortune 500 companies and high-growth startups.",
    projects: ["Led development of microservices architecture serving 2M+ users", "Implemented ML-powered recommendation system increasing engagement by 40%", "Mentored 15+ junior developers and established best practices"],
    portfolioLink: "https://alexandrachen.dev",
    linkedinLink: "https://linkedin.com/in/alexandrachen",
    companyName: "Google",
    targetRole: "Senior Software Engineer",
    recruiterName: "Michael Rodriguez",
    tone: "professional"
};

// Load sample data
loadSampleBtn.addEventListener('click', () => {
    // Fill form with sample data
    document.getElementById('name').value = sampleData.name;
    document.getElementById('role').value = sampleData.role;
    document.getElementById('experience').value = sampleData.experience;
    document.getElementById('skills').value = sampleData.skills.join(', ');
    document.getElementById('projects').value = sampleData.projects.join('\n');
    document.getElementById('portfolioLink').value = sampleData.portfolioLink;
    document.getElementById('linkedinLink').value = sampleData.linkedinLink;
    document.getElementById('companyName').value = sampleData.companyName;
    document.getElementById('targetRole').value = sampleData.targetRole;
    document.getElementById('recruiterName').value = sampleData.recruiterName;
    document.getElementById('tone').value = sampleData.tone;

    // Show success feedback
    showNotification('Sample data loaded successfully!', 'success');
});

// Form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }

    // Show loading
    showLoading(true);
    
    try {
        // Collect form data
        const formData = collectFormData();
        
        // Generate email
        const emailContent = await generateEmail(formData);
        
        // Display result
        displayEmail(emailContent, formData);
        
        // Show success feedback
        showNotification('Email generated successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating email:', error);
        showNotification('Error generating email. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
});

// Copy email to clipboard
copyBtn.addEventListener('click', async () => {
    try {
        const emailText = formatEmailForCopy();
        await navigator.clipboard.writeText(emailText);
        
        // Visual feedback
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copy-success');
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyBtn.classList.remove('copy-success');
        }, 2000);
        
        showNotification('Email copied to clipboard!', 'success');
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        showNotification('Failed to copy to clipboard', 'error');
    }
});

// Helper functions
function validateForm() {
    const requiredFields = ['name', 'role', 'experience', 'skills', 'projects', 'companyName', 'targetRole', 'tone'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('error');
            showNotification(`Please fill in the ${field.placeholder || fieldId} field`, 'error');
            return false;
        } else {
            field.classList.remove('error');
        }
    }
    
    return true;
}

function collectFormData() {
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);
    const projects = document.getElementById('projects').value.split('\n').map(p => p.trim()).filter(p => p);
    
    return {
        name: document.getElementById('name').value.trim(),
        role: document.getElementById('role').value.trim(),
        skills: skills,
        experience: document.getElementById('experience').value.trim(),
        projects: projects,
        portfolioLink: document.getElementById('portfolioLink').value.trim() || undefined,
        linkedinLink: document.getElementById('linkedinLink').value.trim() || undefined,
        companyName: document.getElementById('companyName').value.trim(),
        targetRole: document.getElementById('targetRole').value.trim(),
        recruiterName: document.getElementById('recruiterName').value.trim() || undefined,
        tone: document.getElementById('tone').value
    };
}

async function generateEmail(formData) {
    try {
        const response = await fetch('/api/generate-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate email');
        }

        const result = await response.json();
        return result.email;
    } catch (error) {
        console.error('API Error:', error);
        // Fallback to simulation if API fails
        return await simulateEmailGeneration(formData);
    }
}

async function simulateEmailGeneration(formData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a sample email based on the form data
    const subject = `Application for ${formData.targetRole} Position at ${formData.companyName}`;
    
    const greeting = formData.recruiterName 
        ? `Dear ${formData.recruiterName},`
        : `Dear Hiring Manager,`;
    
    const intro = `I hope this email finds you well. I am writing to express my strong interest in the ${formData.targetRole} position at ${formData.companyName}. With ${formData.experience}, I believe I would be an excellent fit for your team.`;
    
    const skillsSection = `My technical expertise includes ${formData.skills.slice(0, 5).join(', ')}, and I have successfully delivered impactful projects such as:`;
    
    const projectsList = formData.projects.map(project => `• ${project}`).join('\n');
    
    const closing = `I am particularly excited about the opportunity to contribute to ${formData.companyName}'s innovative work and would welcome the chance to discuss how my background, technical skills, and passion for excellence can benefit your team.`;
    
    const signature = `Thank you for considering my application. I look forward to the possibility of speaking with you soon.

Best regards,
${formData.name}
${formData.role}`;

    const links = [];
    if (formData.portfolioLink) {
        links.push(`Portfolio: ${formData.portfolioLink}`);
    }
    if (formData.linkedinLink) {
        links.push(`LinkedIn: ${formData.linkedinLink}`);
    }
    
    const linksSection = links.length > 0 ? `\n\nAdditional Links:\n${links.join('\n')}` : '';
    
    return {
        subject: subject,
        body: `${greeting}

${intro}

${skillsSection}
${projectsList}

${closing}

${signature}${linksSection}`
    };
}

function displayEmail(emailContent, formData) {
    // Update email preview
    emailSubject.textContent = `Subject: ${emailContent.subject}`;
    emailBody.innerHTML = emailContent.body.replace(/\n/g, '<br>');
    
    // Update email meta
    const emailMeta = document.querySelector('.email-meta');
    emailMeta.innerHTML = `
        <span><i class="fas fa-user"></i> To: ${formData.recruiterName || 'Hiring Manager'}</span>
        <span><i class="fas fa-user"></i> From: ${formData.name}</span>
    `;
    
    // Show result container
    resultContainer.style.display = 'block';
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

function formatEmailForCopy() {
    const subject = emailSubject.textContent.replace('Subject: ', '');
    const body = emailBody.innerText;
    return `Subject: ${subject}\n\n${body}`;
}

function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize form validation feedback
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
        field.classList.remove('error');
    });
    
    field.addEventListener('blur', () => {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}); 