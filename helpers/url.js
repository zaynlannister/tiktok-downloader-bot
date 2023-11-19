const urlMatchers = [
  {
    name: "tiktok",
    regexp:
      /^.*https:\/\/?(?:m|www|vm|vt)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/,
  },
];

function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function getUrlPlatform(url) {
  const platform = urlMatchers.find((matcher) => {
    return matcher.regexp.test(url.trim());
  });

  if (platform) {
    return {
      name: platform.name,
      url: new URL(url),
    };
  }

  return {
    name: "unknown",
    url: new URL(url),
  };
}

module.exports = { isUrl, getUrlPlatform };
