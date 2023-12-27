// Select the node that will be observed for mutations
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { childList: true };

const getDurationOfLeave = () => {
  const durationValue = document.querySelector(
    '#demo-select-duration .option-check-icon',
  )?.innerText;
  const sessionDay = document.querySelector(
    '#demo-select-sessionDay .option-check-icon',
  )?.innerText;

  if (durationValue && durationValue === 'Full Day') {
    return 'fullDay';
  }

  if (durationValue && durationValue === 'Half Day' && sessionDay) {
    return sessionDay.toLowerCase();
  }

  return null;
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(() => {
  const el = document.querySelector('.ant-modal-body .group-button .ant-btn-default');
  if (el) {
    el.addEventListener('click', () => {
      const inputs = document.querySelectorAll(
        '.ant-modal-body .ant-picker-range .ant-picker-input input',
      );
      const from = inputs[0].value;
      const to = inputs[1].value;
      const duration = getDurationOfLeave();

      console.log(from, to, duration);

      if (from && to && duration) {
        chrome.runtime.sendMessage({ type: 'submit-leave', range: `${from}-${to}`, duration });
      }
    });
  }
});

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
