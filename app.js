const ELEMENTS = {
    $body: $('body'),
    $alarmForm: $('#alarm-form'),
    $videoContainer: $('#video-container'),
};

main();

function main() {
    ELEMENTS.$alarmForm.on('submit', onSubmitAlarm);
}

function onSubmitAlarm(e) {
    e.preventDefault();
    const form = e.target;
    const time = form.time.value;
    const alarmTime = new Date(`2000-1-1 ${time}`);
    setAlarm(alarmTime);
}

function setAlarm(alarmTime) {
    const now = new Date();
    // reset the date parts so we can compare times
    resetDatePart(alarmTime);
    resetDatePart(now);

    if (alarmTime < now) {
        // time of the alarm is earlier than the current time,
        // so we need to set the alarm for the next day
        alarmTime.setDate(alarmTime.getDate() + 1);
    }

    // the remaining time for the alarm is the difference in milliseconds between the dates
    const timeForAlarmInMs = alarmTime - now;

    setTimeout(onAlarmTriggered, timeForAlarmInMs);
}

/*
 reset the dart part of a Date obj to 1-1-2000
 using this function, it's easy to compare the time part of 2 Date objects
*/
function resetDatePart(date) {
    date.setDate(1);
    date.setMonth(0);
    date.setFullYear(2000);
}

function onAlarmTriggered() {
    showVideo();
    turnOnLightShow();
}

function showVideo() {
    const $iframe = $(`
    <iframe width="640" height="480" src="https://www.youtube.com/embed/gtu6ueiFmQQ?&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
    ELEMENTS.$videoContainer.append($iframe);
}

function turnOnLightShow() {
    // toggle the background color every 2 seconds
    setInterval(() => {
        ELEMENTS.$body.toggleClass('disco');
    }, 2e3);
}