/**
 * Created by pavel on 03.06.17.
 */
class Timer {

    constructor(startCount) {
        this.x = startCount;
        this.canUpdate = true;
        this.target = 0;
    }

    update() {
        if (this.canUpdate) {
            this.x++;
        }
    }

    reset() {
        this.x = 0;
    }

    fullSeconds() {
        var sec = int(this.x / 60);
        return sec;
    }

    fullMinutes() {
        var sec = int(this.x / 3600);
        return sec;
    }

    realSeconds() {
        var sec = this.x / 60;
        return sec;
    }

    realMinutes() {
        var sec = this.x / 3600;
        return sec;
    }

}