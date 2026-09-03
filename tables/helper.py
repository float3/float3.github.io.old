def get_ratio_from_equal_temperament(n, base):
    return 2 ** (n / base)


class tone:
    def __init__(self, index, ratio, ratio_float):
        self.index = index
        self.ratio = ratio
        self.ratio_float = ratio_float


def next_lower_power_of_2(number):
    if number == 1:
        return 1
    power = 1
    while power * 2 < number:
        power *= 2

    return power


def write_ratios_to_file(filename, base):
    with open(filename, "w") as file:
        for i in range(base + 1):
            ratio = get_ratio_from_equal_temperament(i, base)
            file.write(f"{i}: {ratio}\n")
