import { GameTime } from '../GameTime.js';
import { InputAxis } from './InputAxis.js';
import { InputButton } from './InputButton.js';
import { InputGamepad } from './InputGamepad.js';
import { InputKeyboard } from './InputKeyboard.js';
import { InputMapping } from './InputMapping.js';
import { InputMouse } from './InputMouse.js';
import { InputType } from './InputType.js';

export class Input {
    private mouse: InputMouse;
    private keyboard: InputKeyboard;
    private gamepad: InputGamepad;
    private gameTime: GameTime;
    private inputMappingButtons: InputMapping;
    private inputMappingAxes: InputMapping;
    public constructor(gameTime: GameTime) {
        this.gameTime = gameTime;

        this.mouse = new InputMouse(gameTime);
        this.keyboard = new InputKeyboard(gameTime);
        this.gamepad = new InputGamepad(gameTime);

        this.inputMappingButtons = new InputMapping('InputMappingButtons.json');
        this.inputMappingAxes = new InputMapping('InputMappingAxes.json');
    }
    public getButton(t: InputType): InputButton {
        if (['keyboard', 'mouse', 'gamepad'].map(n => this.inputMappingButtons[n][t]).filter(x => x).length === 0) return new InputButton(this.gameTime);

        const btns: InputButton[] = [this.keyboard.getButton(<string>this.inputMappingButtons.keyboard[t]), this.mouse.getButton(<number>this.inputMappingButtons.mouse[t]), this.gamepad.getButton(<number>this.inputMappingButtons.gamepad[t])].filter(e => e && e.down != undefined);

        for (let btn of btns) {
            if (btn.down) return btn;
        }

        return btns[0] || new InputButton(this.gameTime);
    }
    public getAxis(t: InputType): InputAxis {
        //if (t === inputtype.movehorizontal && this.inputmappingaxes.keyboard[t]) console.log(this.keyboard.getaxis(this.inputmappingaxes.keyboard[t]));

        if (['keyboard', 'mouse', 'gamepad'].map(n => this.inputMappingAxes[n][t]).filter(x => x).length === 0) return new InputAxis();

        const axes: InputAxis[] = [this.keyboard.getAxis(<string>this.inputMappingAxes.keyboard[t]), this.mouse.getAxis(<number>this.inputMappingAxes.mouse[t]), this.gamepad.getAxis(<number>this.inputMappingAxes.gamepad[t])].filter(e => e && e.value != undefined).sort((a, b) => Math.abs(a.value) > Math.abs(b.value) ? -1 : 1);

        for (let axis of axes) {
            if (axis.value && axis.value != 0) return axis;
        }

        return axes[0] || new InputAxis();
    }
}