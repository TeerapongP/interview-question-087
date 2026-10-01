using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Example.Interview.Json;

public sealed class DayMonthYearDateConverter : JsonConverter<DateOnly>
{
    private const string Format = "dd/MM/yyyy";

    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) =>
        DateOnly.TryParseExact(reader.GetString(), Format, CultureInfo.InvariantCulture, DateTimeStyles.None, out var date)
            ? date
            : throw new JsonException($"BirthDate must use {Format} format.");

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options) =>
        writer.WriteStringValue(value.ToString(Format, CultureInfo.InvariantCulture));
}
