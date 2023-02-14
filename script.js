const modelSelect = document.getElementById('model');
const customFields = document.getElementById('custom-fields');

modelSelect.addEventListener('change', (e) => {
	if (e.target.value === 'custom') {
		customFields.style.display = 'block';
	} else {
		customFields.style.display = 'none';
	}
});

const computeAmountSelect = document.getElementById('compute-amount');
const customComputeAmount = document.getElementById('custom-compute-amount');

computeAmountSelect.addEventListener('change', (e) => {
	if (e.target.value === 'custom') {
		customComputeAmount.style.display = 'block';
	} else {
		customComputeAmount.style.display = 'none';
	}
});