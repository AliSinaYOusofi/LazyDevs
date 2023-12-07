export function generateIncrementalDates() {
    
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // Adding 1 because months start from 0
    const currentYear = today.getFullYear();
  
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    const labels = [];
  
    for (let i = currentDay; i < lastDayOfMonth; i++) {
      labels.push(`${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${i < 10 ? '0' + i : i}`);
    }
  
    labels.push(`${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentDay < 10 ? '0' + currentDay : currentDay}`);
  
    return labels;
}
  