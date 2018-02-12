import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.Set;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import ca.rmen.porterstemmer.PorterStemmer;
/**
 * 
 * @author harshmeet
 *
 */
public class Task2 {

	private static Set<String> pagesVisited = new HashSet<>();
	private static Queue<String> pagesToVisit = new LinkedList<>();
	public static int fileCount = 0;
	public static int depth = 6;
	public static int maxDocs = 1000;
	public static PorterStemmer s = new PorterStemmer();

	// CRAWLING USING DEPTH FIRST SEARCH
	/**
	 * @param root
	 * @param level
	 * @return Integer
	 * @throws IOException
	 * @throws InterruptedException
	 */
	public static int DFSCrawl(String root, int level) throws IOException,
		InterruptedException {
		if (level > depth)
			return 0;
		if (pagesVisited.size() > maxDocs)
			return 0;
		BufferedWriter writer = new BufferedWriter(new FileWriter("linksDFS.txt",
			true));
		fileCount++;
		Thread.sleep(1000);
		Document document = Jsoup.connect(root).get();
		pagesVisited.add(root);

		// write in the links file
		writer.write(root);
		writer.write("\n");
		writer.close();
		Element linksOnPage = document.getElementById("bodyContent");
		Elements links = linksOnPage.getElementsByTag("a");
		for (Element page : links) {
			String contendor = page.attr("href");
			contendor = testURL(contendor);
			if (!contendor.equals("")) {
				if (!pagesVisited.contains(contendor))
					DFSCrawl(contendor, level + 1);
			}
		}
		return 0;
	}

	// Method to extract the correct URLs
	/**
	 * @param contendor
	 * @return String Url
	 */
	public static String testURL(String contendor) {
		if (contendor == null || contendor.equals(""))
			return "";

		// 1.remove the # links then return empty string
		if (contendor.startsWith("#"))
			return "";

		// 2. Remove the Main Page then return empty string
		else if (contendor.startsWith("https://en.wikipedia.org/wiki/Main_Page"))
			return "";

		// 3. if url contains images and animations then return empty string
		else if ((contendor.endsWith(".jpg")) || (contendor.endsWith(".png"))
			|| (contendor.endsWith(".tiff")) || (contendor.endsWith(".gif")
				|| (contendor.endsWith(".svg")))) {
			return "";
		}

		// 4.if url contains textual media like pdf then then return empty string
		else if ((contendor.endsWith(".txt")) || (contendor.endsWith(".pdf"))) {
			return "";
		}

		// 5. if url contains : or administrative links then return empty string
		else if (contendor.contains(":")) {
			return "";
		}

		// 6. If url contains external links then return empty string
		else if ((contendor.startsWith("http") || contendor.startsWith("www"))
			&& !contendor.contains("en.wikipedia.org"))
			return "";

		// 7. If url contains index then return empty string
		else if (contendor.contains("index.php"))
			return "";

		// 8. If url contains wiki media then return empty string
		else if (contendor.contains("wikimedia"))
			return "";

		// 9. upon inspection some urls which begin with '//'
		// these are absolute urls or uploads for wikipedia.
		else if (contendor.startsWith("//")) {
			String temp = new String(contendor);
			while (temp.startsWith("/"))
				temp = temp.replaceFirst("/", "");
			return testURL(temp);
		}

		// 10. handle relative urls.
		else if (contendor.startsWith("/") || contendor.contains(
			"en.wikipedia.org")) {
			contendor = canonacalize(contendor);
			return contendor;
		}
		return "";
	}

	/**
	 * @param url
	 * @return String URL
	 */
	// Method to handle absolute and relative url
	public static String canonacalize(String url) {
		if (url.startsWith("http") || url.startsWith("www") || url.startsWith(
			"en.wikipedia.org"))
			return url;
		// relative
		while (url.startsWith("/")) {
			url = url.replaceFirst("/", "");
		}
		return "https://en.wikipedia.org" + "/" + url;
	}

	/**
	 * @param root
	 * @param focusCrawl
	 * @param focusWords
	 * @throws IOException
	 * @throws InterruptedException
	 */

	public static void bfsCrawl(String root, Boolean focusCrawl,
		String[] focusWords) throws IOException, InterruptedException {
		BufferedWriter writer = new BufferedWriter(new FileWriter("linksBFS.txt",
			true));
		int level = 0;
		pagesToVisit.add(root);
		pagesToVisit.add("levelUp for BFS");
		int fileCount = 0;
		while (!pagesToVisit.isEmpty()) {
			String crawledURL = pagesToVisit.poll();
			// check if already crawled/
			if (pagesVisited.contains(crawledURL))
				continue;
			if (crawledURL.equals("levelUp for BFS")) {
				// handle the case where the queue gets empty before reaching the depth
				// 6
				if (pagesToVisit.isEmpty())
					break;
				pagesToVisit.add("levelUp for BFS");
				level++;
				if (level > depth)
					break;
				continue;
			}

			writer = new BufferedWriter(new FileWriter("Task2Links.txt", true));
			writer.write(crawledURL);
			writer.write("\n");
			writer.close();
			Document document = Jsoup.connect(crawledURL).get();
			fileCount++;
			Element linksOnPage = document.getElementById("bodyContent");
			Elements links = linksOnPage.getElementsByTag("a");
			pagesVisited.add(crawledURL);
			for (Element page : links) {
				boolean foundinAnchor = false;
				boolean foundinLink = false;
				// if doing focused Crawling
				if (focusCrawl) {
					String[] text = page.text().split(" ");
					for (String word : text) {
						boolean done = false;
						if (word.equals(""))
							continue;
						word = word.replace(" ", "");
						// check here for the presence of words
						// 1. Using stemming
						// 2. checking if the word is contained.
						for (String focusedWord : focusWords) {
							if (s.stemWord(word).equalsIgnoreCase(s.stemWord(focusedWord))
								|| word.contains(s.stemWord(focusedWord)) || focusedWord
									.contains(word)) {
								System.out.println(page.text());
								foundinAnchor = true;
								done = true;
								break;
							}
						}
						if (done)
							break;
					}
				}
				String contendor = page.attr("href");
				contendor = testURL(contendor);
				if (!contendor.equals("")) {
					// check the url for focused words
					if (focusCrawl) {
						String[] text = contendor.split("/");
						for (String word : text) {
							if (word.equals(""))
								continue;
							word = word.replace(" ", "");
							boolean done = false;
							for (String focusedWord : focusWords) {
								if (s.stemWord(word).equalsIgnoreCase(s.stemWord(focusedWord))
									|| word.contains(s.stemWord(focusedWord)) || focusedWord
										.contains(word)) {
									foundinLink = true;
									done = false;
									break;
								}
							}
							if (done)
								break;
						}
					}
					if ((foundinAnchor || foundinLink || !focusCrawl)) {
						pagesToVisit.add(contendor);
					}
				}
			}
			Thread.sleep(1000);
			if (pagesVisited.size() > maxDocs) {
				System.out.println(level);
				break;
			}
		}
	}
/**
 * 
 * @param args
 * @throws IOException
 * @throws InterruptedException
 */
	public static void main(String[] args) throws IOException,
		InterruptedException {
		Scanner input = new Scanner(System.in);
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter number of keywords to search");
		int num = input.nextInt();
		String[] focusWords = new String[num];
		System.out.println("Enter keywords to search");
		for (int i = 0; i < focusWords.length; i++) {
			focusWords[i] = input.next();
		}
		System.out.println("Enter seed URL");
		String seed = sc.nextLine();

		// analyzing focus Words
		ArrayList<String> wordList = new ArrayList<>();

		for (String s : focusWords) {
			// if s has " " i.e Moon Landing we treat Moon and Landing as 2 separate
			// focus words
			if (s.contains(" ")) {
				String[] temp = s.split(" ");
				for (String t : temp)
					wordList.add(t);
			} else if (s.contains("_")) {
				String[] temp = s.split("_");
				for (String t : temp)
					wordList.add(t);
			} else if (s.contains("-")) {
				String[] temp = s.split("-");
				for (String t : temp)
					wordList.add(t);
			} else
				wordList.add(s);
		}
		focusWords = new String[wordList.size()];
		for (int i = 0; i < wordList.size(); i++) {
			focusWords[i] = wordList.get(i);
			//System.out.println(focusWords[i]);
		}
		Task2.bfsCrawl(seed, true, focusWords);
		 System.exit(0);

	}

}