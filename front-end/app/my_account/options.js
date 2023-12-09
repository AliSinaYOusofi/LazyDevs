export const options = {
    
    responsive: true,
    
    plugins: {
        
        legend: {
            position: 'top' ,
        },
        
        title: {
            display: true,
            text: '',
        },
    },
    scales: {
        y: {
            suggestedMin: 0,
            suggestedMax: 10, // Adjust this value based on your data
            ticks: {
                stepSize: 1, // Display integers only
            },
        }
    }
};