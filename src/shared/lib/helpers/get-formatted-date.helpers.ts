const getFormattedDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    const dateObj = new Date(date);

    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
};

export default getFormattedDate;