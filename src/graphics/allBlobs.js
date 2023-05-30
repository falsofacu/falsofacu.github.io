const blob1 = (
  <svg
    id="blob1"
    className="blob"
    viewBox="0 0 900 600"
    width="900"
    height="600"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    version="1.1"
  >
    <g transform="translate(460.29784679709246 337.0436893755699)">
      <path
        id="blob1-1"
        d="M112.1 -206.4C136.5 -180 141.4 -132.3 169.5 -94.3C197.6 -56.3 248.8 -28.2 248.4 -0.3C247.9 27.7 195.8 55.3 161.3 82.2C126.8 109 109.9 135.1 86 146.2C62 157.4 31 153.7 -1.1 155.6C-33.2 157.5 -66.3 164.9 -106.9 163.3C-147.5 161.7 -195.4 151.1 -228.2 122.4C-260.9 93.7 -278.5 46.8 -263.7 8.5C-249 -29.8 -202 -59.7 -174.4 -97.3C-146.8 -135 -138.7 -180.5 -112.8 -206.1C-87 -231.7 -43.5 -237.3 0.2 -237.6C43.8 -237.9 87.7 -232.8 112.1 -206.4"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
      ></path>
    </g>
    <g
      className="hidden"
      transform="translate(452.63165255407944 316.6262176021794)"
    >
      <path
        id="blob1-2"
        d="M101.3 -186.3C133.7 -156.8 163.8 -134.4 181.2 -104.5C198.7 -74.7 203.3 -37.3 214.3 6.3C225.3 50 242.5 100 227.5 134.1C212.5 168.1 165.3 186.3 122 200.6C78.7 214.9 39.3 225.5 -2.9 230.5C-45.2 235.6 -90.3 235.1 -112 208.3C-133.6 181.5 -131.8 128.2 -155.7 89.1C-179.6 50 -229.3 25 -237.4 -4.7C-245.5 -34.3 -211.9 -68.7 -188.8 -109.1C-165.6 -149.5 -152.8 -196 -123.1 -227C-93.3 -258 -46.7 -273.5 -6.1 -263C34.5 -252.4 69 -215.8 101.3 -186.3"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
      ></path>
    </g>
  </svg>
);

//Same as blob1 but I prefered this instead of installing another dependency for deep cloning
const blob2 = (
  <svg
    id="blob2"
    className="blob"
    viewBox="0 0 900 600"
    width="900"
    height="600"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    version="1.1"
  >
    <g transform="translate(460.29784679709246 337.0436893755699)">
      <path
        id="blob2-1"
        d="M112.1 -206.4C136.5 -180 141.4 -132.3 169.5 -94.3C197.6 -56.3 248.8 -28.2 248.4 -0.3C247.9 27.7 195.8 55.3 161.3 82.2C126.8 109 109.9 135.1 86 146.2C62 157.4 31 153.7 -1.1 155.6C-33.2 157.5 -66.3 164.9 -106.9 163.3C-147.5 161.7 -195.4 151.1 -228.2 122.4C-260.9 93.7 -278.5 46.8 -263.7 8.5C-249 -29.8 -202 -59.7 -174.4 -97.3C-146.8 -135 -138.7 -180.5 -112.8 -206.1C-87 -231.7 -43.5 -237.3 0.2 -237.6C43.8 -237.9 87.7 -232.8 112.1 -206.4"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
      ></path>
    </g>
    <g
      className="hidden"
      transform="translate(452.63165255407944 316.6262176021794)"
    >
      <path
        id="blob2-2"
        d="M101.3 -186.3C133.7 -156.8 163.8 -134.4 181.2 -104.5C198.7 -74.7 203.3 -37.3 214.3 6.3C225.3 50 242.5 100 227.5 134.1C212.5 168.1 165.3 186.3 122 200.6C78.7 214.9 39.3 225.5 -2.9 230.5C-45.2 235.6 -90.3 235.1 -112 208.3C-133.6 181.5 -131.8 128.2 -155.7 89.1C-179.6 50 -229.3 25 -237.4 -4.7C-245.5 -34.3 -211.9 -68.7 -188.8 -109.1C-165.6 -149.5 -152.8 -196 -123.1 -227C-93.3 -258 -46.7 -273.5 -6.1 -263C34.5 -252.4 69 -215.8 101.3 -186.3"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
      ></path>
    </g>
  </svg>
);

const startBlob = (
  <svg
    className="blob"
    id="start-blob"
    viewBox="0 0 900 600"
    width="900"
    height="600"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    version="1.1"
  >
    <g transform="translate(451.4578335830196 284.9645482363924)">
      <path
        id="start-blob-1"
        d="M129.9 -205.9C168.2 -202.9 198.8 -167.7 218.4 -128C238 -88.3 246.5 -44.2 241.3 -3C236.1 38.2 217.2 76.3 199.7 119.6C182.2 162.9 166.1 211.4 133.1 228.3C100 245.2 50 230.6 3.8 224.1C-42.5 217.6 -85 219.2 -118.9 202.8C-152.8 186.4 -178.2 151.9 -200.4 115.1C-222.7 78.3 -241.8 39.2 -245.2 -1.9C-248.5 -43 -236 -86 -205.3 -108.2C-174.6 -130.5 -125.8 -131.9 -88.6 -135.4C-51.3 -138.9 -25.7 -144.5 10.1 -161.9C45.8 -179.4 91.7 -208.8 129.9 -205.9"
        fill="#faaf1f"
      ></path>
    </g>
    <g transform="translate(429.672335041134 302.21706435255487)"
      className="hidden">
      <path
        id="start-blob-2"
        d="M121.4 -205C142.7 -197.9 135.4 -135.9 155.8 -92.6C176.1 -49.3 224.1 -24.7 220 -2.3C216 20 159.9 40 135.5 76.2C111.1 112.5 118.3 164.9 101 187.1C83.7 209.2 41.8 201.1 5.2 192.2C-31.5 183.2 -63 173.5 -96.6 160.7C-130.3 148 -166 132.2 -176.3 104.9C-186.5 77.7 -171.3 38.8 -153.9 10C-136.5 -18.8 -117 -37.5 -106.5 -64.4C-96 -91.2 -94.5 -126.1 -78.2 -136.3C-62 -146.4 -31 -131.7 9.5 -148.1C50 -164.6 100 -212.2 121.4 -205"
        fill="#FAAF1F"
      ></path>
    </g>
  </svg>
);

export { blob1, blob2, startBlob };