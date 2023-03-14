function toggleCustomModel() {
    var modelDropdown = document.getElementById("model-dropdown");
    var modelInput = document.getElementById("model-input");
    console.log(modelDropdown.value);
    
    //if the model dropdown is set to custom, change the html to show the input box
    if (modelDropdown.value === "custom") {
        document.getElementById("params-custom").disabled = false;
        document.getElementById("custom-model-row-params").style.display = "";
        document.getElementById("params-tokens").disabled = false;
        document.getElementById("custom-model-row-tokens").style.display = "";
        // change the placeholder text
        document.getElementById("params-custom").placeholder = "Enter custom parameters";
        
    }
    else { 
        document.getElementById("params-custom").disabled = true;
        document.getElementById("custom-model-row-params").style.display = "none";
        document.getElementById("params-tokens").disabled = true;
        document.getElementById("custom-model-row-tokens").style.display = "none";
        if (modelDropdown.value === "gpt-3") {
            var model = new Model("GPT-3", 175000000000, 500000000000);
            //print to console, "else if ran"
            console.log("else if ran");
        }
    }
    //else if the model dropdown is GPT-3
    //test


}



    function toggleCustomCompute(){
    var computeDropdown = document.getElementById("compute-dropdown");
    var computeInput = document.getElementById("compute-input");

    //if the compute dropdown is set to custom, change the html to show the input box
    if (computeDropdown.value === "custom") {
        
        document.getElementById("compute-custom-input").disabled = false;
        document.getElementById("custom-compute-row").style.display = "";

    } else {
        document.getElementById("compute-custom-input").disabled = true;
        document.getElementById("custom-compute-row").style.display = "none";
    }

}
var toUpdate = "";

function checkVars(){
    console.log("checkVars ran");
    console.log("toUpdate: " + toUpdate);
    var compute_params = (document.getElementById("params-custom").value == "") ? null : document.getElementById("params-custom").value;
    var compute_tokens = (document.getElementById("params-tokens").value == "") ? null : document.getElementById("params-tokens").value;
    var compute_flops  = (document.getElementById("compute-custom-input").value == "") ? null : document.getElementById("compute-custom-input").value;
    var compute_chips  = (document.getElementById("compute-chips").value == "") ? null : document.getElementById("compute-chips").value;
    var compute_utilization = (document.getElementById("compute-utilization").value == "") ? null : document.getElementById("compute-utilization").value;
    var compute_time = (document.getElementById("compute-time").value == "") ? null : document.getElementById("compute-time").value;

    // create array of the vars that are null
    var nullVars = [];
    if (compute_params == null) {
        nullVars.push("compute_params");
    }
    if (compute_tokens == null) {
        nullVars.push("compute_tokens");
    }
    if (compute_flops == null) {
        nullVars.push("compute_flops");
    }
    if (compute_chips == null) {
        nullVars.push("compute_chips");
    }
    if (compute_utilization == null) {
        nullVars.push("compute_utilization");
    }
    if (compute_time == null) {
        nullVars.push("compute_time");
    }
    // check if the length of the array is 1
    if (nullVars.length == 1) {
        // if it is, then we can calculate the missing variable
        if (compute_time==null) {
            toUpdate = "time";
            compute_time = compute_flops / (compute_chips * compute_utilization);
            document.getElementById("compute-time").value = compute_time;
        }
    }
    if (nullVars.length == 0) {
        if (toUpdate == "time") {
            console.log("yes");
            compute_time = compute_flops / (compute_chips * compute_utilization);
            document.getElementById("compute-time").value = compute_time;
        }
    }



    // const instance = new TransformerFLOPs(throughput=compute_flops, parameters=compute_params, tokens=compute_tokens, time=compute_time, num_chips=compute_chips, utilization=compute_utilization, cost_per_flop=null);
    // instance.calculateMissingVariable();

    // console.log(instance.parameters);
    // console.log(instance.tokens);
    // console.log(instance.throughput);
    // console.log(instance.num_chips);
    // console.log(instance.utilization);
    // console.log(instance.time);
    // //Vars get updated but don't show in the textbox..    
    // document.getElementById("params-custom").value = instance.parameters;
    // document.getElementById("params-tokens").value = instance.tokens;
    // document.getElementById("compute-custom-input").value = instance.throughput;
    // document.getElementById("compute-chips").value = instance.num_chips;
    // document.getElementById("compute-utilization").value = instance.utilization;
    // document.getElementById("compute-time").value = instance.time;

   // document.getElementById("params-custom").value = instance.parameters;
   // document.getElementById("params-tokens").value = instance.tokens;
   // document.getElementById("compute-custom-input").value = instance.throughput;
   // document.getElementById("compute-chips").value = instance.num_chips;
   // document.getElementById("compute-utilization").value = instance.utilization;
   // document.getElementById("compute-time").value = instance.time;
    
    


}