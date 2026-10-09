"""Tests des explications pédagogiques des erreurs."""
import pytest

from feedback import DIAGNOSTICS, ERROR_EXPLANATIONS, NAME_ERROR_GENERIC, explain
from main import LANGUAGES


@pytest.mark.parametrize("messages", [*ERROR_EXPLANATIONS.values(), *DIAGNOSTICS.values(), NAME_ERROR_GENERIC])
def test_all_languages(messages):
    assert set(messages) == set(LANGUAGES)
    assert all(messages.values())


def test_name_error_mentions_name():
    results = explain({"error_type": "NameError", "error_message": "name 'totl' is not defined", "tests": []}, "fr")
    assert "`totl`" in results["feedback"]


def test_wrong_type_mentions_types():
    test = {"diagnostic": "wrong_type", "actual": "5", "expected": 5}
    explain({"tests": [test]}, "en")
    assert "`str`" in test["feedback"] and "`int`" in test["feedback"]


def test_diagnostic_wins_over_error_type():
    test = {"diagnostic": "returns_none", "error_type": "TypeError"}
    explain({"tests": [test]}, "fr")
    assert test["feedback"] == DIAGNOSTICS["returns_none"]["fr"]


def test_unknown_error_has_no_feedback():
    results = explain({"error_type": "OverflowError", "tests": []}, "fr")
    assert results["feedback"] is None
