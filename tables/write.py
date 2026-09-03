import helper

if __name__ == "__main__":
    helper.write_ratios_to_file("12tet", 12)
    helper.write_ratios_to_file("24tet", 24)
    helper.write_ratios_to_file("6tet", 6)

    i = 128

    tones = [0] * i
    with open(f"overtones_{i}", "w") as file:
        for i in range(i):
            power = helper.next_lower_power_of_2(i)
            ratio_str = str(i) + "/" + str(power)
            tone = (int(i), ratio_str, i / power)
            tones[i] = tone
            file.write(f"{tone[0]}: {tone[2]}: {tone[1]}\n")

        file.write("\n\n\n")

        sorted_tones = sorted(tones, key=lambda x: x[2])
        for tone in sorted_tones:
            file.write(f"{tone[0]}: {tone[2]}: {tone[1]}\n")

        file.write("\n\n\n")

        unique_values_set = set()
        deduplicated_tones = []

        for tone in sorted_tones:
            if tone[2] not in unique_values_set:
                deduplicated_tones.append(tone)
                unique_values_set.add(tone[2])

        for tone in deduplicated_tones:
            file.write(f"{tone[0]}: {tone[2]}: {tone[1]}\n")

        file.write("\n\n\n")

        for i in range(len(deduplicated_tones)):
            if i % 2 != 0:
                file.write(f"{deduplicated_tones[i][0]} ")
