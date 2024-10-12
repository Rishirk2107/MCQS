from educhain import Educhain,LLMConfig
from langchain_nvidia_ai_endpoints import ChatNVIDIA

client = ChatNVIDIA(
        model="meta/llama-3.1-70b-instruct",
        api_key="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", 
        temperature=0.2,
        top_p=0.5,
        max_tokens=1024,
)

llm_config = LLMConfig(custom_model=client)
educhain_client = Educhain(llm_config)


def generate_lesson_plans(Topic):
    plan = educhain_client.content_engine.generate_lesson_plan(
        topic=Topic
    )
    return plan.dict()
