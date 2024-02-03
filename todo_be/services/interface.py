import re

fieldsToExclude = ["created_at", "category_id", "is_active", "task_id", "done_at"]


def excludeFields(dict):
    return {k: v for k, v in dict.items() if k not in fieldsToExclude}


def extractKeyWords(raw_title):
    pattern = r"!(.*?)(?=(?:!|$))"
    matches = re.findall(pattern, raw_title)
    return matches