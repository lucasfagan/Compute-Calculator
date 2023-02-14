class test {
    constructor(GPU, utilization, model=null, parameters=null, num_gpus=null, time=null, money=null ) {
        // the user can either specify a model or a number of parameters, and then must specify 2/3 of num_gpus, time, and money
        //first we compute the flops required from the model or parameters and the GPU
        var flops_required = 0;
        if (model !== null) {
            flops_required = model.flops_required;
            parameters = model.parameters;
        }
        else {
            flops_required = this.computeFlops(parameters, GPU);
        }
        
    }

}