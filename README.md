# TsZoo

Надобно на TSe написать код, который будет симулировать зоопарк.

Зоопарк состоит из вольеров, основанных на различных биомах.
Помимо биома вольер описывается площадью и наличием водоема.

Еще есть животные.
- Описание вида (“Жираф, медведь и тд”):
- Название
- Необходимый биом
- Необходимость водоема
- Необходимая площадь на особь
- Что кушает
- Хищник или травоядное

Описание конкретного животного:
Имя
Сколько кушает

### Правила расселения:
- Животное можно поселить только в вольер, который соответствует его биому, наличию водоема и в котором достаточно места.
- Хищники могут жить только с представителями того же вида.
- Травоядные могут жить с любыми травоядными (да, в жизни не так, не душните)))

### Нужно написать:
- интерфейсы, описывающие представленные выше сущности
- объекты, необходимые для демонстрации работы зоопарка
- функцию, которая определяет, можно ли подселить животное в вольер, и если нет - то почему?
- функцию, которая поселит животное в вольер, или же удалит животное из вольера
- функцию, которая посчитает, сколько еды надо, чтоб накормить всех имеющихся животных во всех имеющихся вольерах
