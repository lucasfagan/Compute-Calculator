class ComputeCalculator { 
    constructor(GPU, utilization, model = null, parameters = null, flops_per_operation = null, multiplier = null) {
        var flops_needed = 0;
        if (model !== null) {
            flops_needed = model.flops_required;
            parameters = model.parameters;
        } else {
            flops_needed = this.computeFlops(parameters, flops_per_operation);
        }
        const time_needed = this.computeTime(flops_needed, GPU, utilization, multiplier);
        this.pretty_time = this.prettyPrintTime(time_needed);
        console.log(`Time required to train: ${this.pretty_time}`);
    }
   
    
    computeFlops(model_params, flops_per_operation) {
        const flops = model_params * flops_per_operation;
        return flops;
    }
    
    computeTime(flops, GPU, utilization, multiplier = null) {
        const flops_per_second = multiplier
        ? GPU.flops_per_second * multiplier
        : GPU.flops_per_second;
        console.log(utilization);
        const true_flops = flops_per_second * utilization;
        const time_required = flops / true_flops;
        return time_required;
    }
    prettyPrintTime(seconds) {
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
        
        return result.trim();
    }
}

    