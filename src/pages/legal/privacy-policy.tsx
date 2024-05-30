import React from 'react';

import Section from './components/terms-and-conditions-display';


interface PrivacyPolicyProps {
    privacyPolicy: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ privacyPolicy }) => (
    <div className="privacy-policy-wrapper">
        <div className="privacy-policy-content">
            <h2>Privacy Policy</h2>
            <p>{privacyPolicy}</p>
        </div>
    </div>
);

const App: React.FC = () => {
    const privacyPolicyText = `At Property Control 360, we are committed to safeguarding the privacy of our users. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our property management system.`;

    const accountSection = {
        title: '',
        notes: [
            { label: 'Information Collection:', content: '  We may collect personal information such as names, contact details, property addresses, and payment information to effectively manage properties and facilitate communication.' },

        ],
    };

    const useOfServiceSection = {
        title: '',
        notes: [
            { label: 'Information Collection:', content: ' The information collected is used to provide property management services, process payments, communicate important updates, and improve our system s functionality.' },

        ],
    };

    const intellectualPropertySection = {
        title: '',
        notes: [
            { label: 'Data Sharing:', content: ' We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except for the purpose of providing the requested services.' },
        ],
    };

    const terminationSection = {
        title: '',
        notes: [
            { label: 'Data Security:', content: ' We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.' },

        ],
    };

    const disclaimerSection = {
        title: '',
        notes: [
            { label: 'Cookies and Tracking:', content: ' We may use cookies and similar tracking technologies to enhance user experience and collect information about usage patterns. Users can manage cookie preferences in their browser settings.' },

        ],
    };

    const thirdParty = {
        title: '',
        notes: [
            { label: 'Third-party Links: ', content: 'Our system may contain links to third-party websites. We do not endorse or take responsibility for the content or privacy practices of these sites.' },

        ],
    };
    const updatesPolicy = {
        title: '',
        notes: [
            { label: 'Updates to Policy: ', content: 'We reserve the right to update this Privacy Policy periodically. Users will be notified of any changes, and continued use of our system implies acceptance of these changes.' },

        ],
    };
    const UserRights = {
        title: '',
        notes: [
            { label: 'User Rights: ', content: 'Users have the right to access, modify, or delete their personal information by contacting us through the provided channels.' },


        ],
    };
    const changesSection = {
        title: '',
        notes: [
            { label: 'User Rights: ', content: 'Users have the right to access, modify, or delete their personal information by contacting us through the provided channels.' },

        ],
    };



    return (
        <div>
            <PrivacyPolicy privacyPolicy={privacyPolicyText} />
            <Section title={accountSection.title} notes={accountSection.notes} />
            <Section title={useOfServiceSection.title} notes={useOfServiceSection.notes} />
            <Section title={intellectualPropertySection.title} notes={intellectualPropertySection.notes} />
            <Section title={terminationSection.title} notes={terminationSection.notes} />
            <Section title={disclaimerSection.title} notes={disclaimerSection.notes} />
            <Section title={changesSection.title} notes={changesSection.notes} />
            <Section title={thirdParty.title} notes={thirdParty.notes} />
            <Section title={updatesPolicy.title} notes={updatesPolicy.notes} />
            <Section title={UserRights.title} notes={UserRights.notes} />


        </div>
    );
};

export default App;