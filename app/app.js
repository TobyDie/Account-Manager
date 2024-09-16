document.addEventListener('DOMContentLoaded', function() {
    app.initialized()
        .then(function(_client) {
            var client = _client;

            client.events.on('app.activated', function() {
                document.getElementById('createWPAccount').addEventListener('click', createWPAccount);
                document.getElementById('sendNewPassword').addEventListener('click', () => showNotification('Action Triggered', 'Send New Password button is working'));
                document.getElementById('deleteEverywhere').addEventListener('click', () => showNotification('Action Triggered', 'Delete Everywhere button is working'));
                document.getElementById('changeChallengeStartDate').addEventListener('click', () => showNotification('Action Triggered', 'Change Challenge Start Date button is working'));
                document.getElementById('grantProducts').addEventListener('click', () => showNotification('Action Triggered', 'Grant Products button is working'));
                document.getElementById('revokeProducts').addEventListener('click', () => showNotification('Action Triggered', 'Revoke Products button is working'));
                document.getElementById('grantGlamIQScans').addEventListener('click', () => showNotification('Action Triggered', 'Grant GlamIQ Scans button is working'));
            });

            async function createWPAccount() {
                try {
                    const contact = await client.data.get('contact');
                    const contactData = contact.contact;

                    const webhookData = {
                        contact_first_name: contactData.first_name,
                        contact_last_name: contactData.last_name,
                        contact_email: contactData.email
                    };

                    const response = await sendToWebhook(webhookData);

                    if (response.ok) {
                        await showNotification('Success', 'WP Account created successfully');
                    } else {
                        await showNotification('Error', 'Failed to create WP Account', 'danger');
                    }
                } catch (error) {
                    await showNotification('Error', 'An error occurred while creating the WP Account', 'danger');
                }
            }

            async function sendToWebhook(data) {
                try {
                    const response = await client.request.invokeTemplate("sendToExternalAPI", {
                        body: JSON.stringify(data)
                    });
                    return { ok: true, data: response };
                } catch (error) {
                    return { ok: false, error: error.message };
                }
            }

            async function showNotification(title, message, type = 'success') {
                try {
                    await client.interface.trigger("showNotify", {
                        type: type,
                        title: title,
                        message: message
                    });
                } catch (error) {
                    console.error('Failed to show notification:', error.message);
                }
            }
        })
        .catch(function(error) {
            console.error('Error during initialization:', error.message);
        });
});