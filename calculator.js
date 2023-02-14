class TransformerFLOPs {
    constructor(gpu=null, throughput=null, model=null, parameters=null, time=null, num_chips=null, utilization=null, cost_per_flop=null) {
        if (model) {
            this.parameters = model.parameters;
            this.tokens = model.tokens;
        } else {
            this.parameters = parameters;
        }
        // note: this assumes you MUST pass in a model or parameters
        
        if(utilization === null){
            this.utilization = 0.3;
        }
        else{  
            this.utilization = utilization;
        }
        
        if (gpu) {
            this.throughput = gpu.throughput * this.utilization;
            this.gpu_cost = gpu.cost;
        } else {
            this.throughput = throughput * this.utilization;
        }
        // note: this assumes you MUST pass in a GPU or throughput
        // 
        // if statement to check if cost_per_flop is null
        if(cost_per_flop === null){
            this.cost_per_flop = 1;
        }
        else{
            this.cost_per_flop = cost_per_flop;
        }
        this.num_chips = num_chips;
        this.time = time;
    }
    
    compute() {
        return 6 * this.parameters * this.tokens;
    }

    computeTime() {
        return this.compute() / (this.num_chips * this.throughput);
    }
    
    computeParameters() {
        return this.compute() / 6 / this.tokens;
    }
    
    computeTokens() {
        return this.compute() / 6 / this.parameters;
    }
    
    computeChips() {
        return this.compute() / (this.time * this.throughput);
    }
    
    ///"User inputs the cost per flop, defaults to $1?"
    cost() {
        return this.gpu_cost * this.compute();
    }
    
    calculateMissingVariable() {
        if (!this.time) {
            this.time = this.computeTime();
        }
        
        if (!this.num_chips) {
            this.num_chips = this.computeChips();
        }
        
        if (!this.parameters) {
            this.parameters = this.computeParameters();
        }
        
        if (!this.tokens) {
            this.tokens = this.computeTokens();
        }
        
        if (!this.cost) {
            this.cost = this.cost();
        }
    } 
    
    prettyTime(seconds) {
        let result = '';
        const year = 31536000;
        const month = 2628000;
        const day = 86400;
        const hour = 3600;
        const minute = 60;
        
        if (seconds >= year) {
            const numberOfYears = Math.floor(seconds / year);
            result += `${numberOfYears} year${numberOfYears !== 1 ? 's' : ''} `;
            seconds = seconds % year;
        }
        
        if (seconds >= month) {
            const numberOfMonths = Math.floor(seconds / month);
            result += `${numberOfMonths} month${numberOfMonths !== 1 ? 's' : ''} `;
            seconds = seconds % month;
        }
        
        if (seconds >= day) {
            const numberOfDays = Math.floor(seconds / day);
            result += `${numberOfDays} day${numberOfDays !== 1 ? 's' : ''} `;
            seconds = seconds % day;
        }
        
        if (seconds >= hour) {
            const numberOfHours = Math.floor(seconds / hour);
            result += `${numberOfHours} hour${numberOfHours !== 1 ? 's' : ''} `;
            seconds = seconds % hour;
        }
        
        if (seconds >= minute) {
            const numberOfMinutes = Math.floor(seconds / minute);
            result += `${numberOfMinutes} minute${numberOfMinutes !== 1 ? 's' : ''} `;
            seconds = seconds % minute;
        }
        
        if (seconds > 0) {
            // add seconds with at most 1 decimal place
            seconds = Math.round(seconds * 10) / 10;
            result += `${seconds} second${seconds !== 1 ? 's' : ''} `;
        }
        this.pretty_time = result.trim();
        return result.trim();
    }
}
