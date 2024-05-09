import React from 'react';

import Section from './components/terms-and-conditions-display';

const App: React.FC = () => {

    const accountSection = {
        title: 'Accounts',
        notes: [
            { label: 'Account Creation', content: ' When you create an account with us, you must provide accurate, complete, and updated information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.' },
            { label: 'Account Security: ', content: 'You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.' },
        ],
    };


    const intellectualPropertySection = {
        title: 'Use of the Service',
        notes: [
            { label: 'Property Management:', content: ' Our Service provides tools and functionalities to manage properties, including but not limited to tenant management, rent collection, and property maintenance.' },
            { label: 'Prohibited Activities:', content: 'You agree not to engage in any illegal or unauthorized use of the Service or violate any laws in your jurisdiction while using our Service.' },
        ],
    };

    const terminationSection = {
        title: 'Intellectual Property',
        notes: [
            { label: '', content: 'The Service and its original content, features, and functionality are and will remain the exclusive property of Property Control 360 and its licensors. The Service is protected by copyright, trademark, and other laws.' },

        ],
    };

    const disclaimerSection = {
        title: 'Termination',
        notes: [
            { label: '', content: 'We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.' },

        ],
    };

    const changesSection = {
        title: 'Disclaimer',
        notes: [
            { label: '', content: 'Our Service is provided "as is," without any warranties of any kind, express or implied. We do not warrant that the Service will be error-free or uninterrupted.' },

        ],
    };

    const changes = {
        title: 'Changes',
        notes: [
            { label: '', content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.' },

        ],
    };
    const contactUsSection = {
        title: 'Contact Us',
        notes: [
            { label: '', content: 'If you have any questions about these Terms, please contact us at [contact information].' },

        ],
    };

    return (
        <div className="terms-and-conditions-wrapper">
            <div className="terms-content">
                <h2>Terms and Conditions</h2>
                <p>Please read these Terms and Conditions carefully before engaging with Property Control 360.
                    Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
                    By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.


                </p>
            </div>

            <div>
                <Section title={accountSection.title} notes={accountSection.notes} />
                <Section title={intellectualPropertySection.title} notes={intellectualPropertySection.notes} />
                <Section title={terminationSection.title} notes={terminationSection.notes} />
                <Section title={disclaimerSection.title} notes={disclaimerSection.notes} />
                <Section title={changesSection.title} notes={changesSection.notes} />
                <Section title={changes.title} notes={changes.notes} />
                <Section title={contactUsSection.title} notes={contactUsSection.notes} />

            </div>
        </div>
    );
};

export default App;



