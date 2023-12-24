import { useState} from 'react'

export default function SortNotifications({ setSortByCriteria }) {
    
    const [sortingCriteria, setSortingCriteria] = useState();
    const [isSortedByDate, setIsSortedByDate] = useState(false)

    const handleCriteriaChange = (event) => {
        
        const selectedCriteria = event.target.value;
        setSortingCriteria(selectedCriteria);

        switch (selectedCriteria) {
            
            case "unreadFirst":
                setSortByCriteria(notfication => sortByUnreadFirst(notfication));
                break;
            
            case "readFirst":
                setSortByCriteria(notfication => sortByReadFirst(notfication));
                break;
            
            case "sortByDate":
                setIsSortedByDate(prev => ! prev)
                setSortByCriteria(notification => sortByDate(notification))
                break;
            // Add more cases for other criteria if needed
            default:
                break;
        }
    };

    const sortByUnreadFirst = (notifications) =>
        notifications
            .slice()
            .sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));

    const sortByReadFirst = (notifications) =>
        notifications
            .slice()
            .sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? -1 : 1));

    
    const sortByDate = (notifications) =>
        notifications
            .slice()
            .sort((a, b) => 
                {
                    const firstDate = new Date(a.At);
                    const secondDate = new Date(b.At);
                    return isSortedByDate ? secondDate - firstDate : firstDate - secondDate
                }
            )

    return (
        <div className="mx-auto m-2">

            <span> Select Sort Options : </span>
            <select value={sortingCriteria} onChange={handleCriteriaChange} className="py-3 px-5 mx-auto rounded-lg border-none bg-white  outline-none">
                <option value="unreadFirst">Unread First</option>
                <option value="readFirst">Read First</option>
                <option value="sortByDate">Sort By Date</option>
            </select>
        </div>
    );
}
