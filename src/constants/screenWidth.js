const screenWidth = {
    mobile: 700,
    tablet: 993
}

export const mobileScreenQuery = {
    maxWidth: screenWidth.mobile
}

export const tabletScreenQuery = {
    minWidth: screenWidth.mobile + 1, maxWidth: screenWidth.tablet - 1
}

export const desktopScreenQuery = {
    minWidth: screenWidth.tablet
}

export const nonMobileScreenQuery = {
    minWidth: screenWidth.mobile + 1
}