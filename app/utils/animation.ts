export const ease = [0.16, 1, 0.3, 1];

export const fadeInFromBottom = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export const blurInFromBottom = {
    initial: { filter: "blur(10px)", opacity: 0, y: 50 },
    animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
}; 