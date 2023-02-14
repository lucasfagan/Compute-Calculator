function toggleCustomModel() {
    var modelDropdown = document.getElementById("model-dropdown");
    var modelInput = document.getElementById("model-input");
    console.log(modelDropdown.value);
    
    //if the model dropdown is set to custom, change the html to show the input box
    if (modelDropdown.value === "custom") {
        //document.getElementById("model-dropdown").innerHTML = "<input value='custom'>Custom</input>";
        //print to console, "if ran"
        console.log("if ran");
    }
    //else if the model dropdown is GPT-3
    else if (modelDropdown.value === "gpt-3") {
        var model = new Model("GPT-3", 175000000000, 500000000000);
        //print to console, "else if ran"
        console.log("else if ran");
    }


}

    function toggleCustomCompute(){
    var computeDropdown = document.getElementById("compute-dropdown");
    var computeInput = document.getElementById("compute-input");

    //if the compute dropdown is set to custom, change the html to show the input box
    if (computeDropdown.value === "custom") {
        
    
    }}