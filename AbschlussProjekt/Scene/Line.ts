import { Vector2 } from './Vector2.js';

export class Line {
    public a: Vector2;
    public b: Vector2;
    public s: Vector2;
    public constructor(a: Vector2, b: Vector2) {
        this.a = a;
        this.b = b;
        this.s = b.clone.sub(a);
    }
    public get center(): Vector2 {
        return Vector2.average(this.a, this.b);
    }
    public intersects(other: Line): Vector2 | undefined {
        const p = this.a;
        const r = this.s;
        const q = other.a;
        const s = other.s;

        const abc = Vector2.cross(q.clone.sub(p), r);
        const def = Vector2.cross(q.clone.sub(p), s);
        const ghi = Vector2.cross(r, s);

        const u = abc / ghi;

        const t = def / ghi;

        if (abc != 0 && t >= 0 && t <= 1 && u >= 0 && u <= 1) return q.clone.add(s.clone.scale(u));
        else return;
    }
    public intersectsCircle(position: Vector2, radius: number): Vector2[] {
        const t = position.clone.sub(this.a).scale(this.s.normalized).sum;

        const E = this.s.normalized.scale(t).add(this.a);

        const LEC = E.distance(position);

        if (LEC < radius) {
            const dt = Math.sqrt(radius ** 2 - LEC ** 2)
            console.log(this.s.normalized, t, E, LEC, dt);

            return [this.s.normalized.scale((t - dt)).add(this.a), this.s.normalized.scale((t + dt)).add(this.a)];
        } else if (LEC == radius) return [E];

        return [];
    }
    public distanceToPoint(point: Vector2): number {
        if (this.s.magnitude === 0) return point.distance(this.a);

        return point.distance(this.closestPoint(point));
    }
    public closestPoint(point: Vector2): Vector2 {
        const distance = Vector2.dot(point.clone.sub(this.a), this.s) / this.s.magnitude;

        if (distance < 0) return this.a;
        else if (distance > 1) return this.b;
        else return this.s.clone.scale(distance).add(this.a);
    }
}