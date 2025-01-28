export function formatIndianCurrency(number) {
    if(number){
        const numStr = number.toString();
        const [wholePart, decimalPart] = numStr.split('.');
    
        // Add commas to the integer part
        let result = '';
        const len = wholePart.length;
        const lastThree = wholePart.slice(-3); // Last 3 digits
        const rest = wholePart.slice(0, -3); // Remaining digits
    
        if (rest.length > 0) {
            result = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
        } else {
            result = lastThree;
        }
    
        return decimalPart ? result + '.' + decimalPart : result;
    } else {
        return number;
    }
}