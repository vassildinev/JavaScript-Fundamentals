function cakes(params) {
    var s = params[0],
        c1 = params[1],
        c2 = params[2],
        c3 = params[3],

        max = 0,
        current = 0,

        i, j, k;

    for(i = 0; i <= ((s / c1) | 0); i++) {
        for(j = 0; j <= ((s / c2) | 0); j++) {
            for(k = 0; k <= ((s / c3) | 0); k++) {
                current = i * c1 + j * c2 + k * c3;

                if(current > max && current <= s) {
                    max = current;
                }
            }
        }
    }

    console.log(max);
}