export default () => {
  let count = 0;
  self.addEventListener(
    'message',
    function (e) {
      console.log(++count);
    },
    false,
  );
};
