// NDA Generator JavaScript
class NDAGenerator {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.agreementType = '';
        this.formData = {};
        this.templates = JSON.parse(localStorage.getItem('ndaTemplates')) || [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTemplates();
    }

    setupEventListeners() {
        // Agreement type selection
        document.querySelectorAll('.type-card').forEach(card => {
            card.addEventListener('click', (e) => {
                document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.agreementType = card.dataset.type;
                document.getElementById('agreement-type').value = this.agreementType;
                this.updatePartyForms();
            });
        });

        // Form navigation
        document.getElementById('nda-form').addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    updatePartyForms() {
        const partyForms = document.getElementById('party-forms');
        partyForms.innerHTML = '';

        switch (this.agreementType) {
            case 'mutual':
                partyForms.innerHTML = this.createMutualPartyForm();
                break;
            case 'oneway':
                partyForms.innerHTML = this.createOneWayPartyForm();
                break;
            case 'multiparty':
                partyForms.innerHTML = this.createMultiPartyForm();
                break;
        }
    }

    createMutualPartyForm() {
        return `
            <div class="party-section">
                <h4>Party A (Disclosing & Receiving)</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="party-a-name">Company/Individual Name</label>
                        <input type="text" id="party-a-name" name="party-a-name" required>
                    </div>
                    <div class="form-group">
                        <label for="party-a-address">Address</label>
                        <input type="text" id="party-a-address" name="party-a-address" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="party-a-representative">Representative Name</label>
                        <input type="text" id="party-a-representative" name="party-a-representative" required>
                    </div>
                    <div class="form-group">
                        <label for="party-a-title">Title</label>
                        <input type="text" id="party-a-title" name="party-a-title" required>
                    </div>
                </div>
            </div>
            
            <div class="party-section">
                <h4>Party B (Disclosing & Receiving)</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="party-b-name">Company/Individual Name</label>
                        <input type="text" id="party-b-name" name="party-b-name" required>
                    </div>
                    <div class="form-group">
                        <label for="party-b-address">Address</label>
                        <input type="text" id="party-b-address" name="party-b-address" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="party-b-representative">Representative Name</label>
                        <input type="text" id="party-b-representative" name="party-b-representative" required>
                    </div>
                    <div class="form-group">
                        <label for="party-b-title">Title</label>
                        <input type="text" id="party-b-title" name="party-b-title" required>
                    </div>
                </div>
            </div>
        `;
    }

    createOneWayPartyForm() {
        return `
            <div class="party-section">
                <h4>Disclosing Party</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="disclosing-name">Company/Individual Name</label>
                        <input type="text" id="disclosing-name" name="disclosing-name" required>
                    </div>
                    <div class="form-group">
                        <label for="disclosing-address">Address</label>
                        <input type="text" id="disclosing-address" name="disclosing-address" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="disclosing-representative">Representative Name</label>
                        <input type="text" id="disclosing-representative" name="disclosing-representative" required>
                    </div>
                    <div class="form-group">
                        <label for="disclosing-title">Title</label>
                        <input type="text" id="disclosing-title" name="disclosing-title" required>
                    </div>
                </div>
            </div>
            
            <div class="party-section">
                <h4>Receiving Party</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="receiving-name">Company/Individual Name</label>
                        <input type="text" id="receiving-name" name="receiving-name" required>
                    </div>
                    <div class="form-group">
                        <label for="receiving-address">Address</label>
                        <input type="text" id="receiving-address" name="receiving-address" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="receiving-representative">Representative Name</label>
                        <input type="text" id="receiving-representative" name="receiving-representative" required>
                    </div>
                    <div class="form-group">
                        <label for="receiving-title">Title</label>
                        <input type="text" id="receiving-title" name="receiving-title" required>
                    </div>
                </div>
            </div>
        `;
    }

    createMultiPartyForm() {
        return `
            <div class="party-section">
                <h4>Party Details</h4>
                <div id="party-list">
                    <div class="party-entry">
                        <h5>Party 1</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" name="party-1-name" required>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" name="party-1-address" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Representative</label>
                                <input type="text" name="party-1-representative" required>
                            </div>
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" name="party-1-title" required>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-outline" onclick="addParty()">
                    <i class="fas fa-plus"></i> Add Another Party
                </button>
            </div>
        `;
    }

    nextStep(step) {
        if (this.validateCurrentStep()) {
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
            
            document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
            document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
            
            this.currentStep = step;
            
            if (step === 4) {
                this.generatePreview();
            }
        }
    }

    prevStep(step) {
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
        
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
        
        this.currentStep = step;
    }

    validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                input.style.borderColor = 'var(--border)';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields before proceeding.');
        }
        
        return isValid;
    }

    generatePreview() {
        this.collectFormData();
        const preview = document.getElementById('preview-content');
        
        preview.innerHTML = `
            <div class="preview-content">
                <h5>Non-Disclosure Agreement</h5>
                <p><strong>Type:</strong> ${this.getAgreementTypeText()}</p>
                <p><strong>Confidentiality Period:</strong> ${this.formData['confidentiality-period']} years</p>
                <p><strong>Governing Law:</strong> ${this.formData['governing-law']}</p>
                <p><strong>Purpose:</strong> ${this.formData.purpose}</p>
                
                <h6>Parties:</h6>
                <div id="preview-parties">
                    ${this.generatePartyPreview()}
                </div>
            </div>
        `;
    }

    collectFormData() {
        const form = document.getElementById('nda-form');
        const formData = new FormData(form);
        this.formData = Object.fromEntries(formData.entries());
    }

    getAgreementTypeText() {
        const types = {
            'mutual': 'Mutual NDA',
            'oneway': 'One-way NDA',
            'multiparty': 'Multi-party NDA'
        };
        return types[this.agreementType] || 'Unknown';
    }

    generatePartyPreview() {
        let html = '';
        
        switch (this.agreementType) {
            case 'mutual':
                html = `
                    <p><strong>Party A:</strong> ${this.formData['party-a-name']} - ${this.formData['party-a-address']}</p>
                    <p><strong>Party B:</strong> ${this.formData['party-b-name']} - ${this.formData['party-b-address']}</p>
                `;
                break;
            case 'oneway':
                html = `
                    <p><strong>Disclosing:</strong> ${this.formData['disclosing-name']} - ${this.formData['disclosing-address']}</p>
                    <p><strong>Receiving:</strong> ${this.formData['receiving-name']} - ${this.formData['receiving-address']}</p>
                `;
                break;
            case 'multiparty':
                const parties = Object.keys(this.formData).filter(key => key.startsWith('party-') && key.includes('-name'));
                parties.forEach((key, index) => {
                    const name = this.formData[key];
                    const address = this.formData[key.replace('-name', '-address')];
                    html += `<p><strong>Party ${index + 1}:</strong> ${name} - ${address}</p>`;
                });
                break;
        }
        
        return html;
    }

    generateNDA() {
        if (!this.validateCurrentStep()) return;
        
        this.collectFormData();
        const ndaContent = this.createNDADocument();
        
        // Create downloadable file
        const blob = new Blob([ndaContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nda-agreement-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Save as template
        this.saveTemplate();
    }

    createNDADocument() {
        const today = new Date().toLocaleDateString();
        
        let partiesSection = '';
        switch (this.agreementType) {
            case 'mutual':
                partiesSection = `
Party A: ${this.formData['party-a-name']}
Address: ${this.formData['party-a-address']}
Representative: ${this.formData['party-a-representative']}, ${this.formData['party-a-title']}

Party B: ${this.formData['party-b-name']}
Address: ${this.formData['party-b-address']}
Representative: ${this.formData['party-b-representative']}, ${this.formData['party-b-title']}
                `;
                break;
            case 'oneway':
                partiesSection = `
Disclosing Party: ${this.formData['disclosing-name']}
Address: ${this.formData['disclosing-address']}
Representative: ${this.formData['disclosing-representative']}, ${this.formData['disclosing-title']}

Receiving Party: ${this.formData['receiving-name']}
Address: ${this.formData['receiving-address']}
Representative: ${this.formData['receiving-representative']}, ${this.formData['receiving-title']}
                `;
                break;
        }

        return `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${today} between:

${partiesSection}

WHEREAS, the parties wish to exchange certain confidential information for the purpose of ${this.formData.purpose};

NOW, THEREFORE, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any and all non-public, proprietary, or confidential information disclosed by either party to the other party.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
a) Keep all Confidential Information strictly confidential
b) Use the Confidential Information solely for the purpose of ${this.formData.purpose}
c) Not disclose Confidential Information to any third parties without prior written consent

3. CONFIDENTIALITY PERIOD
This Agreement shall remain in effect for ${this.formData['confidentiality-period']} years from the date of execution.

4. EXCEPTIONS
The obligations set forth in this Agreement shall not apply to information that:
a) Is or becomes publicly available through no breach of this Agreement
b) Is rightfully received by the Receiving Party from a third party
c) Is independently developed by the Receiving Party
d) Is required to be disclosed by law or court order

5. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of ${this.formData['governing-law']}.

6. REMEDIES
Each party shall be entitled to seek injunctive relief in addition to any other remedies available at law or in equity.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

SIGNATURES:

_________________________    _________________________
[Party A Representative]      [Party B Representative]

Date: _________________      Date: _________________

---

IMPORTANT: This is a template agreement. Consult with a qualified attorney before using this document to ensure it meets your specific legal requirements.
`;
    }

    saveTemplate() {
        const template = {
            id: Date.now(),
            name: `${this.getAgreementTypeText()} - ${new Date().toLocaleDateString()}`,
            type: this.agreementType,
            data: this.formData,
            created: new Date().toISOString()
        };
        
        this.templates.unshift(template);
        localStorage.setItem('ndaTemplates', JSON.stringify(this.templates));
        this.loadTemplates();
    }

    loadTemplates() {
        const templatesList = document.getElementById('templates-list');
        
        if (this.templates.length === 0) {
            templatesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <p>No saved templates yet</p>
                    <p>Create your first NDA to save it as a template</p>
                </div>
            `;
            return;
        }
        
        templatesList.innerHTML = this.templates.map(template => `
            <div class="template-card">
                <div class="template-header">
                    <h4>${template.name}</h4>
                    <span class="template-type">${template.type}</span>
                </div>
                <div class="template-actions">
                    <button class="btn btn-outline" onclick="loadTemplate(${template.id})">
                        <i class="fas fa-edit"></i> Load
                    </button>
                    <button class="btn btn-outline" onclick="deleteTemplate(${template.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    downloadNDA(format) {
        const ndaContent = this.createNDADocument();
        
        if (format === 'pdf') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.setFont('helvetica');
            doc.setFontSize(16);
            doc.text('NON-DISCLOSURE AGREEMENT', 105, 20, { align: 'center' });
            
            doc.setFontSize(12);
            const splitText = doc.splitTextToSize(ndaContent, 180);
            doc.text(splitText, 15, 30);
            
            doc.save(`nda-agreement-${new Date().toISOString().split('T')[0]}.pdf`);
        } else if (format === 'doc') {
            const blob = new Blob([ndaContent], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nda-agreement-${new Date().toISOString().split('T')[0]}.doc`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
}

// Global functions for HTML onclick events
function nextStep(step) {
    ndaGenerator.nextStep(step);
}

function prevStep(step) {
    ndaGenerator.prevStep(step);
}

function generateNDA() {
    ndaGenerator.generateNDA();
}

function downloadNDA(format) {
    ndaGenerator.downloadNDA(format);
}

function saveTemplate() {
    ndaGenerator.saveTemplate();
}

function loadTemplate(id) {
    const template = ndaGenerator.templates.find(t => t.id === id);
    if (template) {
        ndaGenerator.agreementType = template.type;
        ndaGenerator.formData = template.data;
        
        // Pre-fill form
        Object.keys(template.data).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) input.value = template.data[key];
        });
        
        // Set agreement type
        document.querySelector(`[data-type="${template.type}"]`).click();
        
        // Navigate to step 4
        nextStep(4);
    }
}

function deleteTemplate(id) {
    if (confirm('Are you sure you want to delete this template?')) {
        ndaGenerator.templates = ndaGenerator.templates.filter(t => t.id !== id);
        localStorage.setItem('ndaTemplates', JSON.stringify(ndaGenerator.templates));
        ndaGenerator.loadTemplates();
    }
}

function scrollToGenerator() {
    document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
}

function addParty() {
    const partyList = document.getElementById('party-list');
    const partyCount = partyList.children.length + 1;
    
    const partyEntry = document.createElement('div');
    partyEntry.className = 'party-entry';
    partyEntry.innerHTML = `
        <h5>Party ${partyCount}</h5>
        <div class="form-row">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="party-${partyCount}-name" required>
            </div>
            <div class="form-group">
                <label>Address</label>
                <input type="text" name="party-${partyCount}-address" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Representative</label>
                <input type="text" name="party-${partyCount}-representative" required>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="party-${partyCount}-title" required>
            </div>
        </div>
    `;
    
    partyList.appendChild(partyEntry);
}

// Initialize the NDA Generator
let ndaGenerator;
document.addEventListener('DOMContentLoaded', () => {
    ndaGenerator = new NDAGenerator();
});

// Add some CSS for template cards and additional elements
const additionalStyles = `
    .template-card {
        background: white;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        box-shadow: var(--shadow-sm);
    }
    
    .template-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .template-type {
        background: var(--surface);
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius);
        font-size: 0.875rem;
        color: var(--text-secondary);
    }
    
    .template-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .template-actions .btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
    
    .party-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--surface);
        border-radius: var(--radius-lg);
    }
    
    .party-section h4 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }
    
    .party-entry {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--surface);
        border-radius: var(--radius);
    }
    
    .preview-content {
        line-height: 1.6;
    }
    
    .preview-content h5 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .preview-content p {
        margin-bottom: 0.5rem;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);