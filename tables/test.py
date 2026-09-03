def transform_input_to_output(input_string):
    fractions = input_string.split("\t")

    indian_scale = ""

    for index, fraction in enumerate(fractions):
        left, right = fraction.split(":")
        indian_scale += str(index) + ":" + str(left) + "/" + str(right) + ",\n"

    return indian_scale


input_string = ""
output = transform_input_to_output(input_string)
print(output)
