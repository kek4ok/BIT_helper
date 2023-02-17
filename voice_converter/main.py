import speech_recognition
import os


def record_and_recognize_audio():
    with microphone:
        recognized_data = ""
        # уровень шума
        recognizer.adjust_for_ambient_noise(microphone, duration=2)

        try:
            audio = recognizer.listen(microphone, 5, 5)

            with open("microphone-results.wav", "wb") as file:
                file.write(audio.get_wav_data())

        except speech_recognition.WaitTimeoutError:
            print("Микрофон выключен")
            return

        # использование online-распознавания через Google
        try:
            print("Запуск записи")
            recognized_data = recognizer.recognize_google(audio, language="ru").lower()

        except speech_recognition.UnknownValueError:
            pass

        # отсутствие интернет-подключения
        except speech_recognition.RequestError:
            print("Отсутствует интернет-подключение")

        return recognized_data


if __name__ == "__main__":
    # инициализация инструментов распознавания и ввода речи
    recognizer = speech_recognition.Recognizer()
    microphone = speech_recognition.Microphone()

    while True:
        # старт записи речи с последующим выводом распознанной речи
        # и удалением записанного в микрофон аудио
        voice_input = record_and_recognize_audio()
        os.remove("microphone-results.wav")
        print(voice_input)
