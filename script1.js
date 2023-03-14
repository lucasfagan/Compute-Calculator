precision = 5;

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
        
    } else { 
        document.getElementById("params-custom").disabled = true;
        document.getElementById("custom-model-row-params").style.display = "none";
        document.getElementById("params-tokens").disabled = true;
        document.getElementById("custom-model-row-tokens").style.display = "none";
    }
    // run checkvars
    checkVars();


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
    checkVars();

}
var toUpdate = "";
var shouldUpdateNewField = true;
function checkVars(){
    var compute_params;
    var compute_tokens;
    var compute_flops;
    var compute_chips;
    var compute_utilization;
    var compute_time;

    console.log("checkVars ran");
    if (document.getElementById("model-dropdown").value != "custom") {
        if (document.getElementById("model-dropdown").value == "gpt-3") {
            compute_params = 175000000000;
            compute_tokens = 500000000000;
        } else if (document.getElementById("model-dropdown").value == "PaLM") {
            compute_params = 540000000000;
            compute_tokens = 780000000000;
        } else if (document.getElementById("model-dropdown").value == "gpt-2") {
            compute_params = 1500000000;
            compute_tokens = 400000000000;
        }
    } else {
        compute_params = (document.getElementById("params-custom").value == "") ? null : document.getElementById("params-custom").value;
        compute_tokens = (document.getElementById("params-tokens").value == "") ? null : document.getElementById("params-tokens").value;
    }
    if (document.getElementById("compute-dropdown").value != "custom") {
        if (document.getElementById("compute-dropdown").value == "a100") {
            compute_flops = 3.12e14;
        } else if (document.getElementById("compute-dropdown").value == "v100") {
            compute_flops = 1.3e14;
        } else if (document.getElementById("compute-dropdown").value == "rtx-3090") {
            compute_flops = .7e14;
        }
    } else {
        compute_flops = (document.getElementById("compute-custom-input").value == "") ? null : document.getElementById("compute-custom-input").value;
    }  
    compute_chips  = (document.getElementById("compute-chips").value == "") ? null : document.getElementById("compute-chips").value;
    compute_utilization = (document.getElementById("compute-utilization").value == "") ? 30 : document.getElementById("compute-utilization").value;
    compute_time = (document.getElementById("compute-time").value == "") ? null : document.getElementById("compute-time").value;

    

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
    if (nullVars.length == 1 && shouldUpdateNewField) {
        // if it is, then we can calculate the missing variable
        if (compute_time==null) {
            if (shouldUpdateNewField) {
                shouldUpdateNewField = false;
                toUpdate = "time";
            }
            compute_time = 600*compute_params*compute_tokens / (compute_chips * compute_flops *compute_utilization);
            document.getElementById("compute-time").value = round_to_n_sig_figs(compute_time/86400,precision);
            document.getElementById("compute-time").readOnly = true;
        }
        if (compute_flops==null) {
            if (shouldUpdateNewField) {
                shouldUpdateNewField = false;
                toUpdate = "flops";
            }
            compute_flops = 600*compute_params*compute_tokens / (compute_time * compute_chips * compute_utilization);
            document.getElementById("compute-custom-input").value = round_to_n_sig_figs(compute_flops,precision);
            document.getElementById("compute-custom-input").readOnly = true;
        }
        if (compute_chips==null) {
            if (shouldUpdateNewField) {
                shouldUpdateNewField = false;
                toUpdate = "chips";
            }
            compute_chips = 600*compute_params*compute_tokens / (compute_time * compute_flops * compute_utilization);
            document.getElementById("compute-chips").value = round_to_n_sig_figs(compute_chips,precision);
            document.getElementById("compute-chips").readOnly = true;
        }
        if (compute_utilization==null) {
            if (shouldUpdateNewField) {
                toUpdate = "utilization";
                shouldUpdateNewField = false;
            }
            compute_utilization = 600*compute_params*compute_tokens / (compute_time * compute_flops * compute_chips);
            document.getElementById("compute-utilization").value = round_to_n_sig_figs(compute_utilization,precision);
            document.getElementById("compute-utilization").readOnly = true;

        }
        if (compute_params==null) {
            if (shouldUpdateNewField) {
                toUpdate = "params";
                shouldUpdateNewField = false
            }
            compute_params = compute_tokens*compute_chips*compute_utilization*compute_time / (600*compute_tokens);
            document.getElementById("params-custom").value = round_to_n_sig_figs(compute_params,precision);
            document.getElementById("params-custom").readOnly = true;

        }
        if (compute_tokens==null) {
            if (shouldUpdateNewField) {
                toUpdate = "tokens";
                shouldUpdateNewField = false
            }
            compute_tokens = compute_params*compute_chips*compute_utilization*compute_time / (600*compute_params);
            document.getElementById("params-tokens").value = round_to_n_sig_figs(compute_tokens,precision);
            document.getElementById("params-tokens").readOnly = true;
        }
    }
    if (nullVars.length == 0) {
        if (toUpdate == "time") {
            compute_time = 600*compute_params*compute_tokens / (compute_chips * compute_flops *compute_utilization);
            document.getElementById("compute-time").value = round_to_n_sig_figs(compute_time/86400,precision);
        }
        if (toUpdate == "flops") {
            compute_flops = 600*compute_params*compute_tokens / (compute_time * compute_chips * compute_utilization);
            document.getElementById("compute-custom-input").value = round_to_n_sig_figs(compute_flops,precision);
        }
        if (toUpdate == "chips") {
            compute_chips = 600*compute_params*compute_tokens / (compute_time * compute_flops * compute_utilization);
            document.getElementById("compute-chips").value = round_to_n_sig_figs(compute_chips,precision);
        }
        if (toUpdate == "utilization") {
            compute_utilization = 600*compute_params*compute_tokens / (compute_time * compute_flops * compute_chips);
            document.getElementById("compute-utilization").value = round_to_n_sig_figs(compute_utilization,precision);
        }
        if (toUpdate == "params") {
            compute_params = compute_tokens*compute_chips*compute_utilization*compute_time / (600*compute_tokens);
            document.getElementById("params-custom").value = round_to_n_sig_figs(compute_params,precision);
        }
        if (toUpdate == "tokens") {
            compute_tokens = compute_params*compute_chips*compute_utilization*compute_time / (600*compute_params);
            document.getElementById("params-tokens").value = round_to_n_sig_figs(compute_tokens,precision);
        }

    }
//function to round to n sig figs with no scientific notation (always write out number)
function round_to_n_sig_figs(x,n) {
    val = Number.parseFloat(x).toPrecision(n);
    // return val without scientific notation
    return Number(val);
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