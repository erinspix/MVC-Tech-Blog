module.exports = {
    // Format a date as MM/DD/YYYY
    format_date: (date) => {
        // Check if the date is valid before formatting
        if (!date) {
            return '';
        }
        return date.toLocaleDateString(); // This will output in MM/DD/YYYY format
    },
};
