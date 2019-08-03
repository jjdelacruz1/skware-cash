//*******************************************************
// renderTransactions(transactions)
//   given a list of transactions, will generate an HTML
//   string representing the transactions
//*******************************************************
console.info('some information')
console.log('loggy loggy loggy')
console.warn('uh oh, warning!')
console.error('something really bad')


function renderTransactions(transactions) {
	var finalHTML = '<div class="buffer">TRANSACTIONS</div>';

	var transactionsHTML = transactions.map(function (transaction) {
		var transactionHTML = `
		<div class="transaction">
			<div class="name">${transaction.name}</div>
			<div class="for">${transaction.for}</div>
			<div class="date">${transaction.date}</div>
			<div class="amount">${transaction.amount}</div>
		</div>
		`
		return transactionHTML;
	});

	finalHTML += transactionsHTML.join('');

	return finalHTML;
}

//*******************************************************
//   Displays the full transaction list on page load
//   Listens for keyboard input to filter the list of 
//   transactions based on the search string. 
//*******************************************************
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById('transactions').innerHTML = renderTransactions(fullTransactionData);

	document.getElementById('search-input').addEventListener('input', function (e) {
		const targetEl = e.target
		console.assert(e.target, 'target element does not exist')

		const searchString = e.target.value;
		console.assert(typeof e.target.value === 'string', 'e.target.value is not a string!')

		const lowerCaseSearchString = searchString.toLowerCase()
		const keysToSearch = ['name', 'for', 'date', 'amount']

		const filteredData = fullTransactionData.filter(function (transaction) {

			for (let i = 0; i < keysToSearch.length; i++) {
				const objKey = keysToSearch[i]
				const lcText = transaction[objKey].toLowerCase()

				if (lcText.indexOf(lowerCaseSearchString) > -1) {
					return true
				}
			}

			return false

			// const lcName = transaction.name.toLowerCase()
			// const lcFor = transaction.for.toLowerCase()
			// const lcDate = transaction.date.toLowerCase()
			// const lcAmount = transaction.amount.toLowerCase()

			// const foundInName = lcName.indexOf(lowerCaseSearchString) > -1;
			// const foundInFor = lcFor.indexOf(lowerCaseSearchString) > -1;
			// const foundInDate = lcDate.indexOf(lowerCaseSearchString) > -1;
			// const foundInAmount = lcAmount.indexOf(lowerCaseSearchString) > -1;

			// return foundInName || foundInFor || foundInDate || foundInAmount;
		});

		document.getElementById('transactions').innerHTML = renderTransactions(filteredData);
	});

});