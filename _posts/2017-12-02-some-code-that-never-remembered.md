---

layout: post_with_left
title: 复制黏贴一把梭
tags: srcJ
keywords: [ mongoClient, jodaTime ]
update: 2017-12-02 01:11

---

### Mongo
```java
Address deletedAddress = MongoClients.getCollection(MONGO_COLLECTION_NAME, Address.class)
        .findOneAndUpdate(
                and(
                        eq("userId", userId),
                        eq("addressId", addressId),
                        eq("isDel", 0)
                ),
                combine(
                        set("isDel", 1),
                        inc("version", 1),
                        currentDate("lastModified")
                )
        );
```

```java
MongoClientsWithSerializeNulls.getCollection(MONGO_COLLECTION_NAME, Address.class)
        .find(
                and(
                        eq("isDel", 0)
                )
        )
        .sort(descending("lastModified"))
        .forEach((Consumer<Address>) sddress -> result.add(address.getAddressId()));
```

```java
FindOneAndReplaceOptions option = new FindOneAndReplaceOptions();
option.sort(descending("version"));
option.upsert(true);
option.projection(exclude("fillDocSize"));

UserData oldUserData = collection.findOneAndReplace(
        and(
                eq("userId", "xxx"),
                eq("isDel", 0)
        ),
        userData,
        option
);
```


### JodaTime
```java
DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
DateTime dateTime = formatter.parseDateTime("2017-12-02 00:58:00");
```


### Scheduled
```java
/**
 * "0,30  0/1   *   *   *   ?"
 *   秒    分    时  日  月  星期
 * <p>
 * 0/x 表示隔 x 个单位时间
 * ? 表示这个位无所谓
 */
@Scheduled(cron = "0 2 0 * * ?")
```
