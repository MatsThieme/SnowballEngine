import { Behaviour } from '../Components/Behaviour.js';
import { GameTime } from '../../GameTime.js';
import { InputType } from '../../Input/InputType.js';
import { Vector2 } from '../../Vector2.js';

export class Move extends Behaviour {
    async update(gameTime: GameTime): Promise<void> {
        this.gameObject.rigidbody.force.add(new Vector2(this.input.getAxis(InputType.MoveHorizontal).value * gameTime.deltaTime / 1000000, this.input.getAxis(InputType.MoveVertical).value * gameTime.deltaTime / 1000000));
        this.gameObject.rigidbody.torque += this.input.getAxis(InputType.Rotate).value / 100000;
    }
}