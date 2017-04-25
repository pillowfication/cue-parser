
module.exports.CueSheet = CueSheet;
module.exports.File = File;
module.exports.Track = Track;
module.exports.Index = Index;
module.exports.Time = Time;

function CueSheet() {
    this.catalog = undefined;
    this.cdTextFile = undefined;
    this.files = undefined;
    this.performer = undefined;
    this.songWriter = undefined;
    this.title = undefined;
    this.rems = undefined;
}

function File() {
    this.name = undefined;
    this.type = undefined;
    this.tracks = undefined;
}

function Track(number, type) {
    this.number = (number === undefined ? undefined : number);
    this.type = (type || undefined);
    this.title = undefined;
    this.flags = undefined;
    this.isrc = undefined;
    this.performer = undefined;
    this.songWriter = undefined;
    this.pregap = undefined;
    this.postgap = undefined;
    this.indexes = undefined;
}

function Index(number, time) {
    this.number = (number === undefined ? undefined : number);
    this.time = (time || undefined);
}

function Time(min, sec, frame) {
    this.min = min || 0;
    this.sec = sec || 0;
    this.frame = frame || 0;
}

CueSheet.prototype.getCurrentFile = function() {
    if (this.files && this.files.length > 0) {
        return this.files[this.files.length - 1];
    } else {
        return undefined;
    }
}

CueSheet.prototype.getCurrentTrack = function() {
    var file = this.getCurrentFile();

    if (file && file.tracks && file.tracks.length > 0) {
        return file.tracks[file.tracks.length - 1];
    } else {
        return undefined;
    }
};

CueSheet.prototype.newFile = function() {
    if (!this.files) {
        this.files = [];
    }

    this.files.push(new File());

    return this;
};

CueSheet.prototype.newTrack = function(number, type) {
    var file = this.getCurrentFile();

    if (!file) {
        throw new Error('No file for track: ' + number + type);
    }

    if (!file.tracks) {
        file.tracks = [];
    }

    file.tracks.push(new Track(number, type));

    return this;
};
