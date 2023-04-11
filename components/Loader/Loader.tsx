const Loader = () => {
  return (
    <div className="loader-container">
      <span className="loader"></span>
      <style jsx>{`
        .loader-container {
          position: fixed;
          width: 100vw;
          height: calc(100vh);
          display: flex;
          align-items: center;
          z-index: 999;
          justify-content: center;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: black;
        }
        .loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: inline-block;
          border-top: 3px solid #fff;
          border-right: 3px solid transparent;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
