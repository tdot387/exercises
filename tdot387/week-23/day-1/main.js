class PC {
    constructor() {
        this.cpu = null;
        this.gpu = null;
        this.ram = null;
        this.ssd = null;
    }

    outputPCSpecs() {
        return `Config: \nCPU: ${this.cpu}\nGPU: ${this.gpu}\nRAM: ${this.ram}\nSSD: ${this.ssd}\n`
    }
}

class PCBuilder {
    constructor() {
        this.pc = new PC();
    }

    setCPU(cpu) {
        this.pc.cpu = cpu;
        return this
    }

    setGPU(gpu) {
        this.pc.gpu = gpu;
        return this
    }

    setRAM(ram) {
        this.pc.ram = ram;
        return this
    }

    setSSD(ssd) {
        this.pc.ssd = ssd;
        return this
    }

    buildPC() {
        return this.pc;
    }

}


const newPC = new PCBuilder()
.setCPU('AMD Ryzen')
.setGPU('Nvidia Geforce')
.setRAM('1024GB DDR5')
.setSSD('2 TB Seagate')
.buildPC();

console.log(newPC.outputPCSpecs());
