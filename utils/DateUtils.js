// @flow

export default function timeDifference(dateStarted: Date, dateEnded: Date) {
  const dateStartedMillis = dateStarted.getTime();
  const dateEndedMillis = dateEnded.getTime();

  let differenceMillis = dateEndedMillis - dateStartedMillis;

  differenceMillis = differenceMillis / 1000;
  const seconds = Math.floor(differenceMillis % 60);

  differenceMillis = differenceMillis / 60;
  const minutes = Math.floor(differenceMillis % 60);

  differenceMillis = differenceMillis / 60;
  const hours = Math.floor(differenceMillis % 24);

  const days = Math.floor(differenceMillis / 24);

  return (
    days +
    " days, " +
    hours +
    " hours, " +
    minutes +
    " minutes, and " +
    seconds +
    " seconds"
  );
}
