const parseFraction = (str) =>
    str.split("/")
        .map(parseFloat)
        .reduce((a, c) => a / c);

class Working {
    static HUES = ["Ruby", "Topaz", "Lemon", "Malachite", "Sapphire", "Ebony", "Over-Ebony"];
    static PITCHES = ["Double-Flat", "Flat", "Natural", "Sharp", "Double-Sharp"];
    static WEAVES = ["Sparse", "Loose", "Tight", "Locked"];
    static LAW_FACTOR = "7/12";
    static DISPLAY_PRECISION = 10**3;
    
    constructor(caspers, hue, pitch, weave, law = Working.LAW_FACTOR) {
        this.caspers = caspers;
        this.hue = hue;
        this.pitch = pitch;
        this.weave = weave;
        this.law = law;
    }
    
    backlash() {
        let newCaspers = this.caspers * parseFraction(this.law);
        
        // hue is inverted, except Over-Ebony, which remains constant
        let newHue = this.hue;
        if(newHue !== "Over-Ebony") {
            let hueIndex = Working.HUES.indexOf(this.hue);
            let newHueIndex = (Working.HUES.length - 2) - hueIndex;
            newHue = Working.HUES[newHueIndex];
        }
        
        // pitch is inverted
        let pitchIndex = Working.PITCHES.indexOf(this.pitch);
        let newPitchIndex = (Working.PITCHES.length - 1) - pitchIndex;
        let newPitch = Working.PITCHES[newPitchIndex];
        
        // weave remains constant
        let newWeave = this.weave;
        
        return new Working(
            newCaspers, newHue, newPitch, newWeave,
            this.law
        );
    }
    
    getDisplayCaspers() {
        let { caspers } = this;
        let [ base, pow ] = caspers.toExponential().split("e").map(parseFloat);
        let suffix;
        if(pow <= 2) {
            suffix = " Caspers";
        }
        else {
            suffix = " Kilocaspers";
            caspers /= 1000;
        }
        // round to 3 max precision
        caspers = Math.round(caspers * Working.DISPLAY_PRECISION) / Working.DISPLAY_PRECISION;
        return caspers + suffix;
    }
    
    getAdjectivalCaspers() {
        return this.getDisplayCaspers().replace(" ", "-").slice(0, -1);
    }
    
    toString() {
        return `${this.caspers}, ${this.hue}, ${this.pitch}, ${this.weavve}`;
    }
    
    getDescriptor() {
        return `${this.getAdjectivalCaspers()} (${this.hue}, ${this.pitch}, ${this.weave})`;
    }
    
    getButton(statButtons) {
        let button = document.createElement("button");
        button.textContent = "Load this";
        // button.textContent = "\u2190 Load this";
        button.title = this.getDescriptor();
        button.addEventListener("click", () => {
            this.loadTo(statButtons);
        });
        return button;
    }
    
    loadTo(statButtons) {
        let [ caspers, hue, pitch, weave, lawFactor ] = statButtons;
        caspers.value = this.caspers;
        hue.value = this.hue;
        pitch.value = this.pitch;
        weave.value = this.weave;
        lawFactor.value = this.law;
    }
}