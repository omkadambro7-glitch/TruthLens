from fastapi import APIRouter

router = APIRouter()

OFFICIAL_RESOURCES = [
    {
        "jurisdiction": "India",
        "name": "National Cyber Crime Reporting Portal (MHA)",
        "helpline": "1930",
        "url": "https://cybercrime.gov.in",
        "description": "Official Ministry of Home Affairs portal for reporting cybercrime, impersonation, and non-consensual intimate imagery. Dedicated section for crimes against women and children.",
        "category": "Law Enforcement"
    },
    {
        "jurisdiction": "India",
        "name": "National Commission for Women (NCW) Cyber Cell",
        "helpline": "7827170170",
        "url": "http://ncw.nic.in",
        "description": "Statutory body providing grievance redressal and counseling support for women facing digital harassment.",
        "category": "Victim Support"
    },
    {
        "jurisdiction": "Global / International",
        "name": "StopNCII.org (SWGfL / Revenge Porn Helpline)",
        "helpline": None,
        "url": "https://stopncii.org",
        "description": "Global non-profit platform that generates cryptographic hash fingerprints on your own device to prevent the sharing of non-consensual intimate imagery across participating tech platforms without uploading the image.",
        "category": "Proactive Prevention"
    },
    {
        "jurisdiction": "Global / Under 18",
        "name": "Take It Down (NCMEC)",
        "helpline": "1-800-843-5678",
        "url": "https://takeitdown.ncmec.org",
        "description": "Anonymous hash-based removal service operated by the National Center for Missing & Exploited Children for people under 18.",
        "category": "Minors Protection"
    },
    {
        "jurisdiction": "United States",
        "name": "Cyber Civil Rights Initiative (CCRI)",
        "helpline": "1-844-878-2274",
        "url": "https://cybercivilrights.org",
        "description": "Dedicated legal and psychological victim resources for survivors of non-consensual intimate imagery.",
        "category": "Victim Support"
    },
    {
        "jurisdiction": "United Kingdom",
        "name": "Revenge Porn Helpline (SWGfL)",
        "helpline": "0345 6000 459",
        "url": "https://revengepornhelpline.org.uk",
        "description": "Free, confidential UK service assisting victims with case management and direct escalation to major online platforms.",
        "category": "Victim Support"
    }
]

TAKEDOWN_TEMPLATES = [
    {
        "platform": "Meta (Instagram / Facebook / Threads)",
        "title": "Non-Consensual Synthetic Imagery / Impersonation Notice",
        "portal_url": "https://www.facebook.com/help/contact/143363852478561",
        "template_text": (
            "Subject: Urgent Takedown Notice — Non-Consensual Deepfake / Manipulated Imagery\n\n"
            "Dear Meta Trust & Safety Team,\n\n"
            "I am writing to report content published on your platform that constitutes non-consensual synthetic manipulation depicting my likeness.\n\n"
            "URL of infringing content: [INSERT URL]\n"
            "Account username: [INSERT HANDLE]\n"
            "Timestamp observed: [INSERT TIMESTAMP]\n\n"
            "This imagery was created and distributed without my consent, violating Meta Community Standards regarding Inauthentic Content, Harassment, and Non-Consensual Imagery.\n\n"
            "I request that this content and any re-uploads be immediately removed from your servers.\n\n"
            "Sincerely,\n[YOUR FULL NAME]"
        )
    },
    {
        "platform": "X / Twitter",
        "title": "Synthetic and Manipulated Media Takedown",
        "portal_url": "https://help.twitter.com/en/forms/safety-and-sensitive-content",
        "template_text": (
            "Subject: Violation of Synthetic and Manipulated Media Policy\n\n"
            "To X Safety & Legal Team,\n\n"
            "I am submitting this urgent complaint regarding synthetic media posted without consent:\n\n"
            "Post URL: [INSERT POST URL]\n"
            "User Handle: [INSERT HANDLE]\n\n"
            "The post uses AI-generated/manipulated media depicting me in a deceptive manner intended to cause harm and defamation. This violates X's Synthetic and Manipulated Media policy.\n\n"
            "Please delete the post and take appropriate enforcement action.\n\n"
            "Submitted by: [YOUR NAME]"
        )
    },
    {
        "platform": "Google Search / Cloud",
        "title": "Removal of Involuntary Explicit Imagery from Search",
        "portal_url": "https://support.google.com/websearch/troubleshooter/3111061",
        "template_text": (
            "Subject: Request to de-index non-consensual synthetic explicit imagery\n\n"
            "Google Legal Support:\n\n"
            "I request the expedited de-indexing of web search results linking to non-consensual synthetic depictions of myself.\n\n"
            "Search Query: [SEARCH TERMS]\n"
            "Infringing Webpage URLs: [LIST URLS]\n"
            "Image URLs in Google Images: [LIST IMAGE URLS]\n\n"
            "This content was generated and disseminated without authorization. Please remove these links from search index results worldwide."
        )
    },
    {
        "platform": "Telegram",
        "title": "Abuse & Impersonation Channel Report",
        "portal_url": "mailto:abuse@telegram.org",
        "template_text": (
            "To: abuse@telegram.org\n"
            "Subject: Urgent: Non-consensual deepfake dissemination channel\n\n"
            "Dear Telegram Support,\n\n"
            "A public channel/group is distributing non-consensual AI-generated manipulated media of me without consent:\n\n"
            "Channel link: [t.me/channel_name]\n"
            "Message ID / Link: [t.me/channel_name/123]\n\n"
            "This violates Terms of Service. Please remove the content and restrict the offending broadcast group."
        )
    }
]

@router.get("/resources")
async def get_sos_resources():
    return {
        "safety_advisory": (
            "Your safety and privacy are paramount. You do NOT need to upload sensitive imagery to this platform to get help. "
            "TruthLens will never share your information with third parties without your explicit direction."
        ),
        "resources": OFFICIAL_RESOURCES
    }

@router.get("/takedown-templates")
async def get_takedown_templates():
    return TAKEDOWN_TEMPLATES
