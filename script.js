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

const slider = document.getElementById("utilization-rate");
const output = document.getElementById("utilization-rate-value");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}