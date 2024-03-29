/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Jan 23, 2024
 * Description: Show lecture time data in the course info page
 */ 

// Send the checkbox status to the active tab and current window
var sendCheckStatusMessage = (checkboxStatus) => {
    // Get the active tab and current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send the checkbox status 
        chrome.tabs.sendMessage(tabs[0].id, checkboxStatus);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let ztmSectionTimesCheckbox = document.getElementById('ztmSectionTimesCheckbox');

    const ztmSectionTimesIsEnabled = localStorage.getItem('ztmSectionTimes') === 'true'
    ztmSectionTimesCheckbox.checked = ztmSectionTimesIsEnabled

    ztmSectionTimesCheckbox.addEventListener('change', () => {
        // Get the checkbox status
        let checkboxStatus = { 'ztmSectionTimesCheckboxIsChecked' : ztmSectionTimesCheckbox.checked }

        // Set the initial checkbox status
        chrome.storage.sync.set(checkboxStatus, () => {
            // Send the checkbox status dynamically (callback function)
            sendCheckStatusMessage(checkboxStatus);
        })

        localStorage.setItem('ztmSectionTimes', ztmSectionTimesCheckbox.checked)
    })
})
