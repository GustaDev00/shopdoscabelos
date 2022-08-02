
const getTimeUnit = unit => unit < 10 ? '0' + unit : unit;

const insertCountValues = ({days, hours, min, sec}) => {
    const dayContainer = $('#day');
    const hourContainer = $('#hour');
    const minContainer = $('#minute');
    const secContainer = $('#second');

    dayContainer.text(getTimeUnit(days));
    hourContainer.text(getTimeUnit(hours));
    minContainer.text(getTimeUnit(min));
    secContainer.text(getTimeUnit(sec));
}

export const updateCounter = () => {
    let theDay = $('.data-contador').html();
    theDay = theDay.split('/').reverse().join('/');
    const initial = $('.inicio-contador').html();

    const today = new Date();
    const bfLeadsDate = new Date(`${theDay} ${initial}`);

    const difference = bfLeadsDate - today;
    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    const hours = Math.floor(difference / 1000 / 60 / 60) % 24;
    const min = Math.floor(difference / 1000 / 60) % 60;
    const sec = Math.floor(difference / 1000) % 60;

    insertCountValues({ days, hours, min, sec });
}