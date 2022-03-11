// Listen for submit
document.getElementById('loan-group').addEventListener('submit', function(e) {
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


// Calculate results
function calculateResults() {

    console.log('Calculating...');
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayments = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayments.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';

        //Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError("Please check your numbers")
    }

}

//Show error
function showError(error) {

    //Hide results
    document.getElementById('results').style.display = 'none';

    //Hide loader
    document.getElementById('loading').style.display = 'none';

    //create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const headng = document.querySelector('.heading');

    //And class
    errorDiv.className = 'alert alert-danger';

    //Create test node and append div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error before/above heading
    card.insertBefore(errorDiv, headng);

    //Clear error after 3 seconds
    setTimeout(clearError, 2000);
}

//clear error
function clearError() {
    document.querySelector('.alert').remove();
}